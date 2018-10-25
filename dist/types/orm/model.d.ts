import { Model as ORMModel } from "@vuex-orm/core";
import { Field } from "../support/interfaces";
import { Mock, MockOptions } from "../test-utils";
/**
 * Wrapper around a Vuex-ORM model with some useful methods.
 *
 * Also provides a mock system, to define mocking responses for actions.
 */
export default class Model {
    /**
     * The singular name of a model like `blogPost`
     * @type {string}
     */
    readonly singularName: string;
    /**
     * The plural name of a model like `blogPosts`
     * @type {string}
     */
    readonly pluralName: string;
    /**
     * The original Vuex-ORM model
     */
    readonly baseModel: ORMModel;
    /**
     * The fields of the model
     * @type {Map<string, Field>}
     */
    readonly fields: Map<string, Field>;
    /**
     * Container for the mocks.
     * @type {Object}
     */
    private mocks;
    /**
     * @constructor
     * @param {Model} baseModel The original Vuex-ORM model
     */
    constructor(baseModel: ORMModel);
    /**
     * Tells if a field is a numeric field.
     *
     * @param {Field | undefined} field
     * @returns {boolean}
     */
    static isFieldNumber(field: Field | undefined): boolean;
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    static isFieldAttribute(field: Field): boolean;
    /**
     * Tells if a field which represents a relation is a connection (multiple).
     * @param {Field} field
     * @returns {boolean}
     */
    static isConnection(field: Field): boolean;
    /**
     * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
     * @todo is this a good way to add fields?
     * @param {Model} model
     */
    static augment(model: Model): void;
    /**
     * Returns all fields which should be included in a graphql query: All attributes which are not included in the
     * skipFields array or start with $.
     * @returns {Array<string>} field names which should be queried
     */
    getQueryFields(): Array<string>;
    /**
     * Tells if a field should be ignored. This is true for fields that start with a `$` or is it is within the skipField
     * property or is the foreignKey of a belongsTo/hasOne relation.
     *
     * @param {string} field
     * @returns {boolean}
     */
    skipField(field: string): boolean;
    /**
     * @returns {Map<string, Field>} all relations of the model which should be included in a graphql query
     */
    getRelations(): Map<string, Field>;
    /**
     * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
     * of a polymorphic relation.
     * @param {string} name
     * @returns {boolean}
     */
    isTypeFieldOfPolymorphicRelation(name: string): boolean;
    /**
     * Returns a record of this model with the given ID.
     * @param {number} id
     * @returns {any}
     */
    getRecordWithId(id: number): any;
    /**
     * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
     * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Field} field Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    shouldEagerLoadRelation(fieldName: string, field: Field, relatedModel: Model): boolean;
    /**
     * Adds a mock.
     *
     * @param {Mock} mock - Mock config.
     * @returns {boolean}
     */
    $addMock(mock: Mock): boolean;
    /**
     * Finds a mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions like { variables: { id: 42 } }.
     * @returns {Mock | null} null when no mock was found.
     */
    $findMock(action: string, options: MockOptions | undefined): Mock | null;
    /**
     * Hook to be called by all actions in order to get the mock returnValue.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    $mockHook(action: string, options: MockOptions): any;
}
