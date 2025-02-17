// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    ID: string,
    String: string,
    Int: number,
    Boolean: boolean,
    Float: number,
    JSON: any,
    DateTime: any,
    Upload: any,
    Money: any,
}

export interface Query {
    /** The active Channel */
    activeChannel: Channel
    /** The active Customer */
    activeCustomer: (Customer | null)
    /**
     * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
     * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
     * query will once again return `null`.
     */
    activeOrder: (Order | null)
    /** An array of supported Countries */
    availableCountries: Country[]
    /** A list of Collections available to the shop */
    collections: CollectionList
    /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
    collection: (Collection | null)
    /** Returns a list of eligible shipping methods based on the current active Order */
    eligibleShippingMethods: ShippingMethodQuote[]
    /** Returns a list of payment methods and their eligibility based on the current active Order */
    eligiblePaymentMethods: PaymentMethodQuote[]
    /** A list of Facets available to the shop */
    facets: FacetList
    /** Returns a Facet by its id */
    facet: (Facet | null)
    /** Returns information about the current authenticated User */
    me: (CurrentUser | null)
    /** Returns the possible next states that the activeOrder can transition to */
    nextOrderStates: Scalars['String'][]
    /**
     * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
     * currently-authenticated User may be queried.
     */
    order: (Order | null)
    /**
     * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
     * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
     * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
     * general anonymous access to Order data.
     */
    orderByCode: (Order | null)
    /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
    product: (Product | null)
    /** Get a list of Products */
    products: ProductList
    /** Search Products based on the criteria set by the `SearchInput` */
    search: SearchResponse
    __typename: 'Query'
}

export interface Mutation {
    /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
    addItemToOrder: UpdateOrderItemsResult
    /** Remove an OrderLine from the Order */
    removeOrderLine: RemoveOrderItemsResult
    /** Remove all OrderLine from the Order */
    removeAllOrderLines: RemoveOrderItemsResult
    /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
    adjustOrderLine: UpdateOrderItemsResult
    /** Applies the given coupon code to the active Order */
    applyCouponCode: ApplyCouponCodeResult
    /** Removes the given coupon code from the active Order */
    removeCouponCode: (Order | null)
    /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
    transitionOrderToState: (TransitionOrderToStateResult | null)
    /** Sets the shipping address for this order */
    setOrderShippingAddress: ActiveOrderResult
    /** Sets the billing address for this order */
    setOrderBillingAddress: ActiveOrderResult
    /** Allows any custom fields to be set for the active order */
    setOrderCustomFields: ActiveOrderResult
    /**
     * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
     * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
     * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
     * shipping method will apply to.
     */
    setOrderShippingMethod: SetOrderShippingMethodResult
    /** Add a Payment to the Order */
    addPaymentToOrder: AddPaymentToOrderResult
    /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
    setCustomerForOrder: SetCustomerForOrderResult
    /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
    login: NativeAuthenticationResult
    /** Authenticates the user using a named authentication strategy */
    authenticate: AuthenticationResult
    /** End the current authenticated session */
    logout: Success
    /**
     * Register a Customer account with the given credentials. There are three possible registration flows:
     * 
     * _If `authOptions.requireVerification` is set to `true`:_
     * 
     * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
     *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
     *    verified and authenticated in one step.
     * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
     *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
     *    verified and authenticated in one step.
     * 
     * _If `authOptions.requireVerification` is set to `false`:_
     * 
     * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
     */
    registerCustomerAccount: RegisterCustomerAccountResult
    /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
    refreshCustomerVerification: RefreshCustomerVerificationResult
    /** Update an existing Customer */
    updateCustomer: Customer
    /** Create a new Customer Address */
    createCustomerAddress: Address
    /** Update an existing Address */
    updateCustomerAddress: Address
    /** Delete an existing Address */
    deleteCustomerAddress: Success
    /**
     * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
     * 
     * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
     * provided here.
     */
    verifyCustomerAccount: VerifyCustomerAccountResult
    /** Update the password of the active Customer */
    updateCustomerPassword: UpdateCustomerPasswordResult
    /**
     * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
     * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
     * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
     * that verification token to the Customer, which is then used to verify the change of email address.
     */
    requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult
    /**
     * Confirm the update of the emailAddress with the provided token, which has been generated by the
     * `requestUpdateCustomerEmailAddress` mutation.
     */
    updateCustomerEmailAddress: UpdateCustomerEmailAddressResult
    /** Requests a password reset email to be sent */
    requestPasswordReset: (RequestPasswordResetResult | null)
    /** Resets a Customer's password based on the provided token */
    resetPassword: ResetPasswordResult
    createStripePaymentIntent: Scalars['String']
    __typename: 'Mutation'
}

export interface Address {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    fullName: (Scalars['String'] | null)
    company: (Scalars['String'] | null)
    streetLine1: Scalars['String']
    streetLine2: (Scalars['String'] | null)
    city: (Scalars['String'] | null)
    province: (Scalars['String'] | null)
    postalCode: (Scalars['String'] | null)
    country: Country
    phoneNumber: (Scalars['String'] | null)
    defaultShippingAddress: (Scalars['Boolean'] | null)
    defaultBillingAddress: (Scalars['Boolean'] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'Address'
}

export interface Asset {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    type: AssetType
    fileSize: Scalars['Int']
    mimeType: Scalars['String']
    width: Scalars['Int']
    height: Scalars['Int']
    source: Scalars['String']
    preview: Scalars['String']
    focalPoint: (Coordinate | null)
    tags: Tag[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Asset'
}

export interface Coordinate {
    x: Scalars['Float']
    y: Scalars['Float']
    __typename: 'Coordinate'
}

export interface AssetList {
    items: Asset[]
    totalItems: Scalars['Int']
    __typename: 'AssetList'
}

export type AssetType = 'IMAGE' | 'VIDEO' | 'BINARY'

export interface CurrentUser {
    id: Scalars['ID']
    identifier: Scalars['String']
    channels: CurrentUserChannel[]
    __typename: 'CurrentUser'
}

export interface CurrentUserChannel {
    id: Scalars['ID']
    token: Scalars['String']
    code: Scalars['String']
    permissions: Permission[]
    __typename: 'CurrentUserChannel'
}

export interface Channel {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    code: Scalars['String']
    token: Scalars['String']
    defaultTaxZone: (Zone | null)
    defaultShippingZone: (Zone | null)
    defaultLanguageCode: LanguageCode
    availableLanguageCodes: (LanguageCode[] | null)
    /** @deprecated Use defaultCurrencyCode instead */
    currencyCode: CurrencyCode
    defaultCurrencyCode: CurrencyCode
    availableCurrencyCodes: CurrencyCode[]
    /** Not yet used - will be implemented in a future release. */
    trackInventory: (Scalars['Boolean'] | null)
    /** Not yet used - will be implemented in a future release. */
    outOfStockThreshold: (Scalars['Int'] | null)
    pricesIncludeTax: Scalars['Boolean']
    seller: (Seller | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'Channel'
}

export interface Collection {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: (LanguageCode | null)
    name: Scalars['String']
    slug: Scalars['String']
    breadcrumbs: CollectionBreadcrumb[]
    position: Scalars['Int']
    description: Scalars['String']
    featuredAsset: (Asset | null)
    assets: Asset[]
    parent: (Collection | null)
    parentId: Scalars['ID']
    children: (Collection[] | null)
    filters: ConfigurableOperation[]
    translations: CollectionTranslation[]
    productVariants: ProductVariantList
    customFields: (Scalars['JSON'] | null)
    __typename: 'Collection'
}

export interface CollectionBreadcrumb {
    id: Scalars['ID']
    name: Scalars['String']
    slug: Scalars['String']
    __typename: 'CollectionBreadcrumb'
}

export interface CollectionTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    slug: Scalars['String']
    description: Scalars['String']
    __typename: 'CollectionTranslation'
}

export interface CollectionList {
    items: Collection[]
    totalItems: Scalars['Int']
    __typename: 'CollectionList'
}

export type GlobalFlag = 'TRUE' | 'FALSE' | 'INHERIT'

export type AdjustmentType = 'PROMOTION' | 'DISTRIBUTED_ORDER_PROMOTION' | 'OTHER'

export type DeletionResult = 'DELETED' | 'NOT_DELETED'


/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 * 
 * ## Understanding Permission.Owner
 * 
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 * 
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 * 
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 * 
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 * 
 * 
 * @docsCategory common
 */
export type Permission = 'Authenticated' | 'SuperAdmin' | 'Owner' | 'Public' | 'UpdateGlobalSettings' | 'CreateCatalog' | 'ReadCatalog' | 'UpdateCatalog' | 'DeleteCatalog' | 'CreateSettings' | 'ReadSettings' | 'UpdateSettings' | 'DeleteSettings' | 'CreateAdministrator' | 'ReadAdministrator' | 'UpdateAdministrator' | 'DeleteAdministrator' | 'CreateAsset' | 'ReadAsset' | 'UpdateAsset' | 'DeleteAsset' | 'CreateChannel' | 'ReadChannel' | 'UpdateChannel' | 'DeleteChannel' | 'CreateCollection' | 'ReadCollection' | 'UpdateCollection' | 'DeleteCollection' | 'CreateCountry' | 'ReadCountry' | 'UpdateCountry' | 'DeleteCountry' | 'CreateCustomer' | 'ReadCustomer' | 'UpdateCustomer' | 'DeleteCustomer' | 'CreateCustomerGroup' | 'ReadCustomerGroup' | 'UpdateCustomerGroup' | 'DeleteCustomerGroup' | 'CreateFacet' | 'ReadFacet' | 'UpdateFacet' | 'DeleteFacet' | 'CreateOrder' | 'ReadOrder' | 'UpdateOrder' | 'DeleteOrder' | 'CreatePaymentMethod' | 'ReadPaymentMethod' | 'UpdatePaymentMethod' | 'DeletePaymentMethod' | 'CreateProduct' | 'ReadProduct' | 'UpdateProduct' | 'DeleteProduct' | 'CreatePromotion' | 'ReadPromotion' | 'UpdatePromotion' | 'DeletePromotion' | 'CreateShippingMethod' | 'ReadShippingMethod' | 'UpdateShippingMethod' | 'DeleteShippingMethod' | 'CreateTag' | 'ReadTag' | 'UpdateTag' | 'DeleteTag' | 'CreateTaxCategory' | 'ReadTaxCategory' | 'UpdateTaxCategory' | 'DeleteTaxCategory' | 'CreateTaxRate' | 'ReadTaxRate' | 'UpdateTaxRate' | 'DeleteTaxRate' | 'CreateSeller' | 'ReadSeller' | 'UpdateSeller' | 'DeleteSeller' | 'CreateStockLocation' | 'ReadStockLocation' | 'UpdateStockLocation' | 'DeleteStockLocation' | 'CreateSystem' | 'ReadSystem' | 'UpdateSystem' | 'DeleteSystem' | 'CreateZone' | 'ReadZone' | 'UpdateZone' | 'DeleteZone'

export type SortOrder = 'ASC' | 'DESC'

export type ErrorCode = 'UNKNOWN_ERROR' | 'NATIVE_AUTH_STRATEGY_ERROR' | 'INVALID_CREDENTIALS_ERROR' | 'ORDER_STATE_TRANSITION_ERROR' | 'EMAIL_ADDRESS_CONFLICT_ERROR' | 'GUEST_CHECKOUT_ERROR' | 'ORDER_LIMIT_ERROR' | 'NEGATIVE_QUANTITY_ERROR' | 'INSUFFICIENT_STOCK_ERROR' | 'COUPON_CODE_INVALID_ERROR' | 'COUPON_CODE_EXPIRED_ERROR' | 'COUPON_CODE_LIMIT_ERROR' | 'ORDER_MODIFICATION_ERROR' | 'INELIGIBLE_SHIPPING_METHOD_ERROR' | 'NO_ACTIVE_ORDER_ERROR' | 'ORDER_PAYMENT_STATE_ERROR' | 'INELIGIBLE_PAYMENT_METHOD_ERROR' | 'PAYMENT_FAILED_ERROR' | 'PAYMENT_DECLINED_ERROR' | 'ALREADY_LOGGED_IN_ERROR' | 'MISSING_PASSWORD_ERROR' | 'PASSWORD_VALIDATION_ERROR' | 'PASSWORD_ALREADY_SET_ERROR' | 'VERIFICATION_TOKEN_INVALID_ERROR' | 'VERIFICATION_TOKEN_EXPIRED_ERROR' | 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR' | 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR' | 'PASSWORD_RESET_TOKEN_INVALID_ERROR' | 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR' | 'NOT_VERIFIED_ERROR'

export type LogicalOperator = 'AND' | 'OR'


/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export interface NativeAuthStrategyError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'NativeAuthStrategyError'
}


/** Returned if the user authentication credentials are not valid */
export interface InvalidCredentialsError {
    errorCode: ErrorCode
    message: Scalars['String']
    authenticationError: Scalars['String']
    __typename: 'InvalidCredentialsError'
}


/** Returned if there is an error in transitioning the Order state */
export interface OrderStateTransitionError {
    errorCode: ErrorCode
    message: Scalars['String']
    transitionError: Scalars['String']
    fromState: Scalars['String']
    toState: Scalars['String']
    __typename: 'OrderStateTransitionError'
}


/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export interface EmailAddressConflictError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'EmailAddressConflictError'
}


/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export interface GuestCheckoutError {
    errorCode: ErrorCode
    message: Scalars['String']
    errorDetail: Scalars['String']
    __typename: 'GuestCheckoutError'
}


/** Returned when the maximum order size limit has been reached. */
export interface OrderLimitError {
    errorCode: ErrorCode
    message: Scalars['String']
    maxItems: Scalars['Int']
    __typename: 'OrderLimitError'
}


/** Returned when attempting to set a negative OrderLine quantity. */
export interface NegativeQuantityError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'NegativeQuantityError'
}


/** Returned when attempting to add more items to the Order than are available */
export interface InsufficientStockError {
    errorCode: ErrorCode
    message: Scalars['String']
    quantityAvailable: Scalars['Int']
    order: Order
    __typename: 'InsufficientStockError'
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeInvalidError {
    errorCode: ErrorCode
    message: Scalars['String']
    couponCode: Scalars['String']
    __typename: 'CouponCodeInvalidError'
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeExpiredError {
    errorCode: ErrorCode
    message: Scalars['String']
    couponCode: Scalars['String']
    __typename: 'CouponCodeExpiredError'
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeLimitError {
    errorCode: ErrorCode
    message: Scalars['String']
    couponCode: Scalars['String']
    limit: Scalars['Int']
    __typename: 'CouponCodeLimitError'
}


/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export interface OrderModificationError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'OrderModificationError'
}


/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export interface IneligibleShippingMethodError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'IneligibleShippingMethodError'
}


/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export interface NoActiveOrderError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'NoActiveOrderError'
}

export type PaginatedList = (AssetList | CollectionList | CustomerList | FacetList | FacetValueList | HistoryEntryList | OrderList | ProductList | ProductVariantList | PromotionList | CountryList | ProvinceList | RoleList | ShippingMethodList | TagList | TaxRateList) & { __isUnion?: true }

export type Node = (Address | Asset | Channel | Collection | CustomerGroup | Customer | FacetValue | Facet | HistoryEntry | Order | OrderLine | Payment | Refund | Fulfillment | Surcharge | PaymentMethod | ProductOptionGroup | ProductOption | Product | ProductVariant | Promotion | Country | Province | Role | Seller | ShippingMethod | Tag | TaxCategory | TaxRate | User | AuthenticationMethod | Zone) & { __isUnion?: true }

export type ErrorResult = (NativeAuthStrategyError | InvalidCredentialsError | OrderStateTransitionError | EmailAddressConflictError | GuestCheckoutError | OrderLimitError | NegativeQuantityError | InsufficientStockError | CouponCodeInvalidError | CouponCodeExpiredError | CouponCodeLimitError | OrderModificationError | IneligibleShippingMethodError | NoActiveOrderError | OrderPaymentStateError | IneligiblePaymentMethodError | PaymentFailedError | PaymentDeclinedError | AlreadyLoggedInError | MissingPasswordError | PasswordValidationError | PasswordAlreadySetError | VerificationTokenInvalidError | VerificationTokenExpiredError | IdentifierChangeTokenInvalidError | IdentifierChangeTokenExpiredError | PasswordResetTokenInvalidError | PasswordResetTokenExpiredError | NotVerifiedError) & { __isUnion?: true }

export interface Adjustment {
    adjustmentSource: Scalars['String']
    type: AdjustmentType
    description: Scalars['String']
    amount: Scalars['Money']
    data: (Scalars['JSON'] | null)
    __typename: 'Adjustment'
}

export interface TaxLine {
    description: Scalars['String']
    taxRate: Scalars['Float']
    __typename: 'TaxLine'
}

export interface ConfigArg {
    name: Scalars['String']
    value: Scalars['String']
    __typename: 'ConfigArg'
}

export interface ConfigArgDefinition {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    required: Scalars['Boolean']
    defaultValue: (Scalars['JSON'] | null)
    label: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'ConfigArgDefinition'
}

export interface ConfigurableOperation {
    code: Scalars['String']
    args: ConfigArg[]
    __typename: 'ConfigurableOperation'
}

export interface ConfigurableOperationDefinition {
    code: Scalars['String']
    args: ConfigArgDefinition[]
    description: Scalars['String']
    __typename: 'ConfigurableOperationDefinition'
}

export interface DeletionResponse {
    result: DeletionResult
    message: (Scalars['String'] | null)
    __typename: 'DeletionResponse'
}


/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export interface Success {
    success: Scalars['Boolean']
    __typename: 'Success'
}

export interface ShippingMethodQuote {
    id: Scalars['ID']
    price: Scalars['Money']
    priceWithTax: Scalars['Money']
    code: Scalars['String']
    name: Scalars['String']
    description: Scalars['String']
    /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
    metadata: (Scalars['JSON'] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'ShippingMethodQuote'
}

export interface PaymentMethodQuote {
    id: Scalars['ID']
    code: Scalars['String']
    name: Scalars['String']
    description: Scalars['String']
    isEligible: Scalars['Boolean']
    eligibilityMessage: (Scalars['String'] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'PaymentMethodQuote'
}

export type UpdateOrderItemsResult = (Order | OrderModificationError | OrderLimitError | NegativeQuantityError | InsufficientStockError) & { __isUnion?: true }

export type RemoveOrderItemsResult = (Order | OrderModificationError) & { __isUnion?: true }

export type SetOrderShippingMethodResult = (Order | OrderModificationError | IneligibleShippingMethodError | NoActiveOrderError) & { __isUnion?: true }

export type ApplyCouponCodeResult = (Order | CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError) & { __isUnion?: true }


/**
 * @description
 * ISO 4217 currency code
 * 
 * @docsCategory common
 */
export type CurrencyCode = 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BBD' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BRL' | 'BSD' | 'BTN' | 'BWP' | 'BYN' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'EUR' | 'FJD' | 'FKP' | 'GBP' | 'GEL' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LKR' | 'LRD' | 'LSL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRU' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLL' | 'SOS' | 'SRD' | 'SSP' | 'STN' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'USD' | 'UYU' | 'UZS' | 'VES' | 'VND' | 'VUV' | 'WST' | 'XAF' | 'XCD' | 'XOF' | 'XPF' | 'YER' | 'ZAR' | 'ZMW' | 'ZWL'

export type CustomField = (StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig | RelationCustomFieldConfig | TextCustomFieldConfig | LocaleTextCustomFieldConfig) & { __isUnion?: true }

export interface StringCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    length: (Scalars['Int'] | null)
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    pattern: (Scalars['String'] | null)
    options: (StringFieldOption[] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'StringCustomFieldConfig'
}

export interface StringFieldOption {
    value: Scalars['String']
    label: (LocalizedString[] | null)
    __typename: 'StringFieldOption'
}

export interface LocaleStringCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    length: (Scalars['Int'] | null)
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    pattern: (Scalars['String'] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'LocaleStringCustomFieldConfig'
}

export interface IntCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    min: (Scalars['Int'] | null)
    max: (Scalars['Int'] | null)
    step: (Scalars['Int'] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'IntCustomFieldConfig'
}

export interface FloatCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    min: (Scalars['Float'] | null)
    max: (Scalars['Float'] | null)
    step: (Scalars['Float'] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'FloatCustomFieldConfig'
}

export interface BooleanCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'BooleanCustomFieldConfig'
}


/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export interface DateTimeCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    min: (Scalars['String'] | null)
    max: (Scalars['String'] | null)
    step: (Scalars['Int'] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'DateTimeCustomFieldConfig'
}

export interface RelationCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    entity: Scalars['String']
    scalarFields: Scalars['String'][]
    ui: (Scalars['JSON'] | null)
    __typename: 'RelationCustomFieldConfig'
}

export interface TextCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'TextCustomFieldConfig'
}

export interface LocaleTextCustomFieldConfig {
    name: Scalars['String']
    type: Scalars['String']
    list: Scalars['Boolean']
    label: (LocalizedString[] | null)
    description: (LocalizedString[] | null)
    readonly: (Scalars['Boolean'] | null)
    internal: (Scalars['Boolean'] | null)
    nullable: (Scalars['Boolean'] | null)
    requiresPermission: (Permission[] | null)
    ui: (Scalars['JSON'] | null)
    __typename: 'LocaleTextCustomFieldConfig'
}

export interface LocalizedString {
    languageCode: LanguageCode
    value: Scalars['String']
    __typename: 'LocalizedString'
}

export type CustomFieldConfig = (StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig | RelationCustomFieldConfig | TextCustomFieldConfig | LocaleTextCustomFieldConfig) & { __isUnion?: true }

export interface CustomerGroup {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    customers: CustomerList
    customFields: (Scalars['JSON'] | null)
    __typename: 'CustomerGroup'
}

export interface Customer {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    title: (Scalars['String'] | null)
    firstName: Scalars['String']
    lastName: Scalars['String']
    phoneNumber: (Scalars['String'] | null)
    emailAddress: Scalars['String']
    addresses: (Address[] | null)
    orders: OrderList
    user: (User | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'Customer'
}

export interface CustomerList {
    items: Customer[]
    totalItems: Scalars['Int']
    __typename: 'CustomerList'
}

export interface FacetValue {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    facet: Facet
    facetId: Scalars['ID']
    name: Scalars['String']
    code: Scalars['String']
    translations: FacetValueTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'FacetValue'
}

export interface FacetValueTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'FacetValueTranslation'
}

export interface Facet {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    code: Scalars['String']
    values: FacetValue[]
    /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
    valueList: FacetValueList
    translations: FacetTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Facet'
}

export interface FacetTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'FacetTranslation'
}

export interface FacetList {
    items: Facet[]
    totalItems: Scalars['Int']
    __typename: 'FacetList'
}

export interface FacetValueList {
    items: FacetValue[]
    totalItems: Scalars['Int']
    __typename: 'FacetValueList'
}

export interface HistoryEntry {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    type: HistoryEntryType
    data: Scalars['JSON']
    __typename: 'HistoryEntry'
}

export type HistoryEntryType = 'CUSTOMER_REGISTERED' | 'CUSTOMER_VERIFIED' | 'CUSTOMER_DETAIL_UPDATED' | 'CUSTOMER_ADDED_TO_GROUP' | 'CUSTOMER_REMOVED_FROM_GROUP' | 'CUSTOMER_ADDRESS_CREATED' | 'CUSTOMER_ADDRESS_UPDATED' | 'CUSTOMER_ADDRESS_DELETED' | 'CUSTOMER_PASSWORD_UPDATED' | 'CUSTOMER_PASSWORD_RESET_REQUESTED' | 'CUSTOMER_PASSWORD_RESET_VERIFIED' | 'CUSTOMER_EMAIL_UPDATE_REQUESTED' | 'CUSTOMER_EMAIL_UPDATE_VERIFIED' | 'CUSTOMER_NOTE' | 'ORDER_STATE_TRANSITION' | 'ORDER_PAYMENT_TRANSITION' | 'ORDER_FULFILLMENT' | 'ORDER_CANCELLATION' | 'ORDER_REFUND_TRANSITION' | 'ORDER_FULFILLMENT_TRANSITION' | 'ORDER_NOTE' | 'ORDER_COUPON_APPLIED' | 'ORDER_COUPON_REMOVED' | 'ORDER_MODIFIED' | 'ORDER_CUSTOMER_UPDATED'

export interface HistoryEntryList {
    items: HistoryEntry[]
    totalItems: Scalars['Int']
    __typename: 'HistoryEntryList'
}


/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 * 
 * @docsCategory common
 */
export type LanguageCode = 'af' | 'ak' | 'sq' | 'am' | 'ar' | 'hy' | 'as' | 'az' | 'bm' | 'bn' | 'eu' | 'be' | 'bs' | 'br' | 'bg' | 'my' | 'ca' | 'ce' | 'zh' | 'zh_Hans' | 'zh_Hant' | 'cu' | 'kw' | 'co' | 'hr' | 'cs' | 'da' | 'nl' | 'nl_BE' | 'dz' | 'en' | 'en_AU' | 'en_CA' | 'en_GB' | 'en_US' | 'eo' | 'et' | 'ee' | 'fo' | 'fi' | 'fr' | 'fr_CA' | 'fr_CH' | 'ff' | 'gl' | 'lg' | 'ka' | 'de' | 'de_AT' | 'de_CH' | 'el' | 'gu' | 'ht' | 'ha' | 'he' | 'hi' | 'hu' | 'is' | 'ig' | 'id' | 'ia' | 'ga' | 'it' | 'ja' | 'jv' | 'kl' | 'kn' | 'ks' | 'kk' | 'km' | 'ki' | 'rw' | 'ko' | 'ku' | 'ky' | 'lo' | 'la' | 'lv' | 'ln' | 'lt' | 'lu' | 'lb' | 'mk' | 'mg' | 'ms' | 'ml' | 'mt' | 'gv' | 'mi' | 'mr' | 'mn' | 'ne' | 'nd' | 'se' | 'nb' | 'nn' | 'ny' | 'or' | 'om' | 'os' | 'ps' | 'fa' | 'fa_AF' | 'pl' | 'pt' | 'pt_BR' | 'pt_PT' | 'pa' | 'qu' | 'ro' | 'ro_MD' | 'rm' | 'rn' | 'ru' | 'sm' | 'sg' | 'sa' | 'gd' | 'sr' | 'sn' | 'ii' | 'sd' | 'si' | 'sk' | 'sl' | 'so' | 'st' | 'es' | 'es_ES' | 'es_MX' | 'su' | 'sw' | 'sw_CD' | 'sv' | 'tg' | 'ta' | 'tt' | 'te' | 'th' | 'bo' | 'ti' | 'to' | 'tr' | 'tk' | 'uk' | 'ur' | 'ug' | 'uz' | 'vi' | 'vo' | 'cy' | 'fy' | 'wo' | 'xh' | 'yi' | 'yo' | 'zu'

export type OrderType = 'Regular' | 'Seller' | 'Aggregate'

export interface Order {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    type: OrderType
    /**
     * The date & time that the Order was placed, i.e. the Customer
     * completed the checkout and the Order is no longer "active"
     */
    orderPlacedAt: (Scalars['DateTime'] | null)
    /** A unique code for the Order */
    code: Scalars['String']
    state: Scalars['String']
    /** An order is active as long as the payment process has not been completed */
    active: Scalars['Boolean']
    customer: (Customer | null)
    shippingAddress: (OrderAddress | null)
    billingAddress: (OrderAddress | null)
    lines: OrderLine[]
    /**
     * Surcharges are arbitrary modifications to the Order total which are neither
     * ProductVariants nor discounts resulting from applied Promotions. For example,
     * one-off discounts based on customer interaction, or surcharges based on payment
     * methods.
     */
    surcharges: Surcharge[]
    discounts: Discount[]
    /** An array of all coupon codes applied to the Order */
    couponCodes: Scalars['String'][]
    /** Promotions applied to the order. Only gets populated after the payment process has completed. */
    promotions: Promotion[]
    payments: (Payment[] | null)
    fulfillments: (Fulfillment[] | null)
    totalQuantity: Scalars['Int']
    /**
     * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
     * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
     * To get a total of all OrderLines which does not account for prorated discounts, use the
     * sum of `OrderLine.discountedLinePrice` values.
     */
    subTotal: Scalars['Money']
    /** Same as subTotal, but inclusive of tax */
    subTotalWithTax: Scalars['Money']
    currencyCode: CurrencyCode
    shippingLines: ShippingLine[]
    shipping: Scalars['Money']
    shippingWithTax: Scalars['Money']
    /** Equal to subTotal plus shipping */
    total: Scalars['Money']
    /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
    totalWithTax: Scalars['Money']
    /** A summary of the taxes being applied to this Order */
    taxSummary: OrderTaxSummary[]
    history: HistoryEntryList
    customFields: (Scalars['JSON'] | null)
    __typename: 'Order'
}


/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export interface OrderTaxSummary {
    /** A description of this tax */
    description: Scalars['String']
    /** The taxRate as a percentage */
    taxRate: Scalars['Float']
    /** The total net price of OrderLines to which this taxRate applies */
    taxBase: Scalars['Money']
    /** The total tax being applied to the Order at this taxRate */
    taxTotal: Scalars['Money']
    __typename: 'OrderTaxSummary'
}

export interface OrderAddress {
    fullName: (Scalars['String'] | null)
    company: (Scalars['String'] | null)
    streetLine1: (Scalars['String'] | null)
    streetLine2: (Scalars['String'] | null)
    city: (Scalars['String'] | null)
    province: (Scalars['String'] | null)
    postalCode: (Scalars['String'] | null)
    country: (Scalars['String'] | null)
    countryCode: (Scalars['String'] | null)
    phoneNumber: (Scalars['String'] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'OrderAddress'
}

export interface OrderList {
    items: Order[]
    totalItems: Scalars['Int']
    __typename: 'OrderList'
}

export interface ShippingLine {
    id: Scalars['ID']
    shippingMethod: ShippingMethod
    price: Scalars['Money']
    priceWithTax: Scalars['Money']
    discountedPrice: Scalars['Money']
    discountedPriceWithTax: Scalars['Money']
    discounts: Discount[]
    __typename: 'ShippingLine'
}

export interface Discount {
    adjustmentSource: Scalars['String']
    type: AdjustmentType
    description: Scalars['String']
    amount: Scalars['Money']
    amountWithTax: Scalars['Money']
    __typename: 'Discount'
}

export interface OrderLine {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    productVariant: ProductVariant
    featuredAsset: (Asset | null)
    /** The price of a single unit, excluding tax and discounts */
    unitPrice: Scalars['Money']
    /** The price of a single unit, including tax but excluding discounts */
    unitPriceWithTax: Scalars['Money']
    /** Non-zero if the unitPrice has changed since it was initially added to Order */
    unitPriceChangeSinceAdded: Scalars['Money']
    /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
    unitPriceWithTaxChangeSinceAdded: Scalars['Money']
    /**
     * The price of a single unit including discounts, excluding tax.
     * 
     * If Order-level discounts have been applied, this will not be the
     * actual taxable unit price (see `proratedUnitPrice`), but is generally the
     * correct price to display to customers to avoid confusion
     * about the internal handling of distributed Order-level discounts.
     */
    discountedUnitPrice: Scalars['Money']
    /** The price of a single unit including discounts and tax */
    discountedUnitPriceWithTax: Scalars['Money']
    /**
     * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
     * and refund calculations.
     */
    proratedUnitPrice: Scalars['Money']
    /** The proratedUnitPrice including tax */
    proratedUnitPriceWithTax: Scalars['Money']
    /** The quantity of items purchased */
    quantity: Scalars['Int']
    /** The quantity at the time the Order was placed */
    orderPlacedQuantity: Scalars['Int']
    taxRate: Scalars['Float']
    /** The total price of the line excluding tax and discounts. */
    linePrice: Scalars['Money']
    /** The total price of the line including tax but excluding discounts. */
    linePriceWithTax: Scalars['Money']
    /** The price of the line including discounts, excluding tax */
    discountedLinePrice: Scalars['Money']
    /** The price of the line including discounts and tax */
    discountedLinePriceWithTax: Scalars['Money']
    /**
     * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
     * and refund calculations.
     */
    proratedLinePrice: Scalars['Money']
    /** The proratedLinePrice including tax */
    proratedLinePriceWithTax: Scalars['Money']
    /** The total tax on this line */
    lineTax: Scalars['Money']
    discounts: Discount[]
    taxLines: TaxLine[]
    order: Order
    fulfillmentLines: (FulfillmentLine[] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'OrderLine'
}

export interface Payment {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    method: Scalars['String']
    amount: Scalars['Money']
    state: Scalars['String']
    transactionId: (Scalars['String'] | null)
    errorMessage: (Scalars['String'] | null)
    refunds: Refund[]
    metadata: (Scalars['JSON'] | null)
    __typename: 'Payment'
}

export interface RefundLine {
    orderLine: OrderLine
    orderLineId: Scalars['ID']
    quantity: Scalars['Int']
    refund: Refund
    refundId: Scalars['ID']
    __typename: 'RefundLine'
}

export interface Refund {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    items: Scalars['Money']
    shipping: Scalars['Money']
    adjustment: Scalars['Money']
    total: Scalars['Money']
    method: (Scalars['String'] | null)
    state: Scalars['String']
    transactionId: (Scalars['String'] | null)
    reason: (Scalars['String'] | null)
    lines: RefundLine[]
    paymentId: Scalars['ID']
    metadata: (Scalars['JSON'] | null)
    __typename: 'Refund'
}

export interface FulfillmentLine {
    orderLine: OrderLine
    orderLineId: Scalars['ID']
    quantity: Scalars['Int']
    fulfillment: Fulfillment
    fulfillmentId: Scalars['ID']
    __typename: 'FulfillmentLine'
}

export interface Fulfillment {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    lines: FulfillmentLine[]
    /** @deprecated Use the `lines` field instead */
    summary: FulfillmentLine[]
    state: Scalars['String']
    method: Scalars['String']
    trackingCode: (Scalars['String'] | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'Fulfillment'
}

export interface Surcharge {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    description: Scalars['String']
    sku: (Scalars['String'] | null)
    taxLines: TaxLine[]
    price: Scalars['Money']
    priceWithTax: Scalars['Money']
    taxRate: Scalars['Float']
    __typename: 'Surcharge'
}

export interface PaymentMethod {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    code: Scalars['String']
    description: Scalars['String']
    enabled: Scalars['Boolean']
    checker: (ConfigurableOperation | null)
    handler: ConfigurableOperation
    translations: PaymentMethodTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'PaymentMethod'
}

export interface PaymentMethodTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    description: Scalars['String']
    __typename: 'PaymentMethodTranslation'
}

export interface ProductOptionGroup {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    code: Scalars['String']
    name: Scalars['String']
    options: ProductOption[]
    translations: ProductOptionGroupTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'ProductOptionGroup'
}

export interface ProductOptionGroupTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'ProductOptionGroupTranslation'
}

export interface ProductOption {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    code: Scalars['String']
    name: Scalars['String']
    groupId: Scalars['ID']
    group: ProductOptionGroup
    translations: ProductOptionTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'ProductOption'
}

export interface ProductOptionTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'ProductOptionTranslation'
}

export interface SearchReindexResponse {
    success: Scalars['Boolean']
    __typename: 'SearchReindexResponse'
}

export interface SearchResponse {
    items: SearchResult[]
    totalItems: Scalars['Int']
    facetValues: FacetValueResult[]
    collections: CollectionResult[]
    __typename: 'SearchResponse'
}


/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export interface FacetValueResult {
    facetValue: FacetValue
    count: Scalars['Int']
    __typename: 'FacetValueResult'
}


/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export interface CollectionResult {
    collection: Collection
    count: Scalars['Int']
    __typename: 'CollectionResult'
}

export interface SearchResultAsset {
    id: Scalars['ID']
    preview: Scalars['String']
    focalPoint: (Coordinate | null)
    __typename: 'SearchResultAsset'
}

export interface SearchResult {
    sku: Scalars['String']
    slug: Scalars['String']
    productId: Scalars['ID']
    productName: Scalars['String']
    productAsset: (SearchResultAsset | null)
    productVariantId: Scalars['ID']
    productVariantName: Scalars['String']
    productVariantAsset: (SearchResultAsset | null)
    price: SearchResultPrice
    priceWithTax: SearchResultPrice
    currencyCode: CurrencyCode
    description: Scalars['String']
    facetIds: Scalars['ID'][]
    facetValueIds: Scalars['ID'][]
    /** An array of ids of the Collections in which this result appears */
    collectionIds: Scalars['ID'][]
    /** A relevance score for the result. Differs between database implementations */
    score: Scalars['Float']
    inStock: Scalars['Boolean']
    __typename: 'SearchResult'
}


/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = (PriceRange | SinglePrice) & { __isUnion?: true }


/** The price value where the result has a single price */
export interface SinglePrice {
    value: Scalars['Money']
    __typename: 'SinglePrice'
}


/** The price range where the result has more than one price */
export interface PriceRange {
    min: Scalars['Money']
    max: Scalars['Money']
    __typename: 'PriceRange'
}

export interface Product {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    slug: Scalars['String']
    description: Scalars['String']
    enabled: Scalars['Boolean']
    featuredAsset: (Asset | null)
    assets: Asset[]
    /** Returns all ProductVariants */
    variants: ProductVariant[]
    /** Returns a paginated, sortable, filterable list of ProductVariants */
    variantList: ProductVariantList
    optionGroups: ProductOptionGroup[]
    facetValues: FacetValue[]
    translations: ProductTranslation[]
    collections: Collection[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Product'
}

export interface ProductTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    slug: Scalars['String']
    description: Scalars['String']
    __typename: 'ProductTranslation'
}

export interface ProductList {
    items: Product[]
    totalItems: Scalars['Int']
    __typename: 'ProductList'
}

export interface ProductVariantList {
    items: ProductVariant[]
    totalItems: Scalars['Int']
    __typename: 'ProductVariantList'
}

export interface ProductVariant {
    id: Scalars['ID']
    product: Product
    productId: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    sku: Scalars['String']
    name: Scalars['String']
    featuredAsset: (Asset | null)
    assets: Asset[]
    price: Scalars['Money']
    currencyCode: CurrencyCode
    priceWithTax: Scalars['Money']
    stockLevel: Scalars['String']
    taxRateApplied: TaxRate
    taxCategory: TaxCategory
    options: ProductOption[]
    facetValues: FacetValue[]
    translations: ProductVariantTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'ProductVariant'
}

export interface ProductVariantTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'ProductVariantTranslation'
}

export interface Promotion {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    startsAt: (Scalars['DateTime'] | null)
    endsAt: (Scalars['DateTime'] | null)
    couponCode: (Scalars['String'] | null)
    perCustomerUsageLimit: (Scalars['Int'] | null)
    usageLimit: (Scalars['Int'] | null)
    name: Scalars['String']
    description: Scalars['String']
    enabled: Scalars['Boolean']
    conditions: ConfigurableOperation[]
    actions: ConfigurableOperation[]
    translations: PromotionTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Promotion'
}

export interface PromotionTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    description: Scalars['String']
    __typename: 'PromotionTranslation'
}

export interface PromotionList {
    items: Promotion[]
    totalItems: Scalars['Int']
    __typename: 'PromotionList'
}

export type Region = (Country | Province) & { __isUnion?: true }

export interface RegionTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    __typename: 'RegionTranslation'
}


/**
 * A Country of the world which your shop operates in.
 * 
 * The `code` field is typically a 2-character ISO code such as "GB", "US", "DE" etc. This code is used in certain inputs such as
 * `UpdateAddressInput` and `CreateAddressInput` to specify the country.
 */
export interface Country {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    code: Scalars['String']
    type: Scalars['String']
    name: Scalars['String']
    enabled: Scalars['Boolean']
    parent: (Region | null)
    parentId: (Scalars['ID'] | null)
    translations: RegionTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Country'
}

export interface CountryList {
    items: Country[]
    totalItems: Scalars['Int']
    __typename: 'CountryList'
}

export interface Province {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    code: Scalars['String']
    type: Scalars['String']
    name: Scalars['String']
    enabled: Scalars['Boolean']
    parent: (Region | null)
    parentId: (Scalars['ID'] | null)
    translations: RegionTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Province'
}

export interface ProvinceList {
    items: Province[]
    totalItems: Scalars['Int']
    __typename: 'ProvinceList'
}

export interface Role {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    code: Scalars['String']
    description: Scalars['String']
    permissions: Permission[]
    channels: Channel[]
    __typename: 'Role'
}

export interface RoleList {
    items: Role[]
    totalItems: Scalars['Int']
    __typename: 'RoleList'
}

export interface Seller {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    customFields: (Scalars['JSON'] | null)
    __typename: 'Seller'
}

export interface ShippingMethod {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    code: Scalars['String']
    name: Scalars['String']
    description: Scalars['String']
    fulfillmentHandlerCode: Scalars['String']
    checker: ConfigurableOperation
    calculator: ConfigurableOperation
    translations: ShippingMethodTranslation[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'ShippingMethod'
}

export interface ShippingMethodTranslation {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    languageCode: LanguageCode
    name: Scalars['String']
    description: Scalars['String']
    __typename: 'ShippingMethodTranslation'
}

export interface ShippingMethodList {
    items: ShippingMethod[]
    totalItems: Scalars['Int']
    __typename: 'ShippingMethodList'
}

export interface Tag {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    value: Scalars['String']
    __typename: 'Tag'
}

export interface TagList {
    items: Tag[]
    totalItems: Scalars['Int']
    __typename: 'TagList'
}

export interface TaxCategory {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    isDefault: Scalars['Boolean']
    customFields: (Scalars['JSON'] | null)
    __typename: 'TaxCategory'
}

export interface TaxRate {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    enabled: Scalars['Boolean']
    value: Scalars['Float']
    category: TaxCategory
    zone: Zone
    customerGroup: (CustomerGroup | null)
    customFields: (Scalars['JSON'] | null)
    __typename: 'TaxRate'
}

export interface TaxRateList {
    items: TaxRate[]
    totalItems: Scalars['Int']
    __typename: 'TaxRateList'
}

export interface User {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    identifier: Scalars['String']
    verified: Scalars['Boolean']
    roles: Role[]
    lastLogin: (Scalars['DateTime'] | null)
    authenticationMethods: AuthenticationMethod[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'User'
}

export interface AuthenticationMethod {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    strategy: Scalars['String']
    __typename: 'AuthenticationMethod'
}

export interface Zone {
    id: Scalars['ID']
    createdAt: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    name: Scalars['String']
    members: Region[]
    customFields: (Scalars['JSON'] | null)
    __typename: 'Zone'
}


/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export interface OrderPaymentStateError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'OrderPaymentStateError'
}


/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export interface IneligiblePaymentMethodError {
    errorCode: ErrorCode
    message: Scalars['String']
    eligibilityCheckerMessage: (Scalars['String'] | null)
    __typename: 'IneligiblePaymentMethodError'
}


/** Returned when a Payment fails due to an error. */
export interface PaymentFailedError {
    errorCode: ErrorCode
    message: Scalars['String']
    paymentErrorMessage: Scalars['String']
    __typename: 'PaymentFailedError'
}


/** Returned when a Payment is declined by the payment provider. */
export interface PaymentDeclinedError {
    errorCode: ErrorCode
    message: Scalars['String']
    paymentErrorMessage: Scalars['String']
    __typename: 'PaymentDeclinedError'
}


/** Returned when attempting to set the Customer for an Order when already logged in. */
export interface AlreadyLoggedInError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'AlreadyLoggedInError'
}


/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export interface MissingPasswordError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'MissingPasswordError'
}


/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export interface PasswordValidationError {
    errorCode: ErrorCode
    message: Scalars['String']
    validationErrorMessage: Scalars['String']
    __typename: 'PasswordValidationError'
}


/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export interface PasswordAlreadySetError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'PasswordAlreadySetError'
}


/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export interface VerificationTokenInvalidError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'VerificationTokenInvalidError'
}


/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface VerificationTokenExpiredError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'VerificationTokenExpiredError'
}


/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export interface IdentifierChangeTokenInvalidError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'IdentifierChangeTokenInvalidError'
}


/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface IdentifierChangeTokenExpiredError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'IdentifierChangeTokenExpiredError'
}


/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export interface PasswordResetTokenInvalidError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'PasswordResetTokenInvalidError'
}


/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface PasswordResetTokenExpiredError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'PasswordResetTokenExpiredError'
}


/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export interface NotVerifiedError {
    errorCode: ErrorCode
    message: Scalars['String']
    __typename: 'NotVerifiedError'
}

export type AddPaymentToOrderResult = (Order | OrderPaymentStateError | IneligiblePaymentMethodError | PaymentFailedError | PaymentDeclinedError | OrderStateTransitionError | NoActiveOrderError) & { __isUnion?: true }

export type TransitionOrderToStateResult = (Order | OrderStateTransitionError) & { __isUnion?: true }

export type SetCustomerForOrderResult = (Order | AlreadyLoggedInError | EmailAddressConflictError | NoActiveOrderError | GuestCheckoutError) & { __isUnion?: true }

export type RegisterCustomerAccountResult = (Success | MissingPasswordError | PasswordValidationError | NativeAuthStrategyError) & { __isUnion?: true }

export type RefreshCustomerVerificationResult = (Success | NativeAuthStrategyError) & { __isUnion?: true }

export type VerifyCustomerAccountResult = (CurrentUser | VerificationTokenInvalidError | VerificationTokenExpiredError | MissingPasswordError | PasswordValidationError | PasswordAlreadySetError | NativeAuthStrategyError) & { __isUnion?: true }

export type UpdateCustomerPasswordResult = (Success | InvalidCredentialsError | PasswordValidationError | NativeAuthStrategyError) & { __isUnion?: true }

export type RequestUpdateCustomerEmailAddressResult = (Success | InvalidCredentialsError | EmailAddressConflictError | NativeAuthStrategyError) & { __isUnion?: true }

export type UpdateCustomerEmailAddressResult = (Success | IdentifierChangeTokenInvalidError | IdentifierChangeTokenExpiredError | NativeAuthStrategyError) & { __isUnion?: true }

export type RequestPasswordResetResult = (Success | NativeAuthStrategyError) & { __isUnion?: true }

export type ResetPasswordResult = (CurrentUser | PasswordResetTokenInvalidError | PasswordResetTokenExpiredError | PasswordValidationError | NativeAuthStrategyError | NotVerifiedError) & { __isUnion?: true }

export type NativeAuthenticationResult = (CurrentUser | InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError) & { __isUnion?: true }

export type AuthenticationResult = (CurrentUser | InvalidCredentialsError | NotVerifiedError) & { __isUnion?: true }

export type ActiveOrderResult = (Order | NoActiveOrderError) & { __isUnion?: true }

export interface QueryGenqlSelection{
    /** The active Channel */
    activeChannel?: ChannelGenqlSelection
    /** The active Customer */
    activeCustomer?: CustomerGenqlSelection
    /**
     * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
     * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
     * query will once again return `null`.
     */
    activeOrder?: OrderGenqlSelection
    /** An array of supported Countries */
    availableCountries?: CountryGenqlSelection
    /** A list of Collections available to the shop */
    collections?: (CollectionListGenqlSelection & { __args?: {options?: (CollectionListOptions | null)} })
    /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
    collection?: (CollectionGenqlSelection & { __args?: {id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null)} })
    /** Returns a list of eligible shipping methods based on the current active Order */
    eligibleShippingMethods?: ShippingMethodQuoteGenqlSelection
    /** Returns a list of payment methods and their eligibility based on the current active Order */
    eligiblePaymentMethods?: PaymentMethodQuoteGenqlSelection
    /** A list of Facets available to the shop */
    facets?: (FacetListGenqlSelection & { __args?: {options?: (FacetListOptions | null)} })
    /** Returns a Facet by its id */
    facet?: (FacetGenqlSelection & { __args: {id: Scalars['ID']} })
    /** Returns information about the current authenticated User */
    me?: CurrentUserGenqlSelection
    /** Returns the possible next states that the activeOrder can transition to */
    nextOrderStates?: boolean | number
    /**
     * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
     * currently-authenticated User may be queried.
     */
    order?: (OrderGenqlSelection & { __args: {id: Scalars['ID']} })
    /**
     * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
     * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
     * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
     * general anonymous access to Order data.
     */
    orderByCode?: (OrderGenqlSelection & { __args: {code: Scalars['String']} })
    /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
    product?: (ProductGenqlSelection & { __args?: {id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null)} })
    /** Get a list of Products */
    products?: (ProductListGenqlSelection & { __args?: {options?: (ProductListOptions | null)} })
    /** Search Products based on the criteria set by the `SearchInput` */
    search?: (SearchResponseGenqlSelection & { __args: {input: SearchInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
    addItemToOrder?: (UpdateOrderItemsResultGenqlSelection & { __args: {productVariantId: Scalars['ID'], quantity: Scalars['Int']} })
    /** Remove an OrderLine from the Order */
    removeOrderLine?: (RemoveOrderItemsResultGenqlSelection & { __args: {orderLineId: Scalars['ID']} })
    /** Remove all OrderLine from the Order */
    removeAllOrderLines?: RemoveOrderItemsResultGenqlSelection
    /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
    adjustOrderLine?: (UpdateOrderItemsResultGenqlSelection & { __args: {orderLineId: Scalars['ID'], quantity: Scalars['Int']} })
    /** Applies the given coupon code to the active Order */
    applyCouponCode?: (ApplyCouponCodeResultGenqlSelection & { __args: {couponCode: Scalars['String']} })
    /** Removes the given coupon code from the active Order */
    removeCouponCode?: (OrderGenqlSelection & { __args: {couponCode: Scalars['String']} })
    /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
    transitionOrderToState?: (TransitionOrderToStateResultGenqlSelection & { __args: {state: Scalars['String']} })
    /** Sets the shipping address for this order */
    setOrderShippingAddress?: (ActiveOrderResultGenqlSelection & { __args: {input: CreateAddressInput} })
    /** Sets the billing address for this order */
    setOrderBillingAddress?: (ActiveOrderResultGenqlSelection & { __args: {input: CreateAddressInput} })
    /** Allows any custom fields to be set for the active order */
    setOrderCustomFields?: (ActiveOrderResultGenqlSelection & { __args: {input: UpdateOrderInput} })
    /**
     * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
     * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
     * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
     * shipping method will apply to.
     */
    setOrderShippingMethod?: (SetOrderShippingMethodResultGenqlSelection & { __args: {shippingMethodId: Scalars['ID'][]} })
    /** Add a Payment to the Order */
    addPaymentToOrder?: (AddPaymentToOrderResultGenqlSelection & { __args: {input: PaymentInput} })
    /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
    setCustomerForOrder?: (SetCustomerForOrderResultGenqlSelection & { __args: {input: CreateCustomerInput} })
    /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
    login?: (NativeAuthenticationResultGenqlSelection & { __args: {username: Scalars['String'], password: Scalars['String'], rememberMe?: (Scalars['Boolean'] | null)} })
    /** Authenticates the user using a named authentication strategy */
    authenticate?: (AuthenticationResultGenqlSelection & { __args: {input: AuthenticationInput, rememberMe?: (Scalars['Boolean'] | null)} })
    /** End the current authenticated session */
    logout?: SuccessGenqlSelection
    /**
     * Register a Customer account with the given credentials. There are three possible registration flows:
     * 
     * _If `authOptions.requireVerification` is set to `true`:_
     * 
     * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
     *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
     *    verified and authenticated in one step.
     * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
     *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
     *    verified and authenticated in one step.
     * 
     * _If `authOptions.requireVerification` is set to `false`:_
     * 
     * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
     */
    registerCustomerAccount?: (RegisterCustomerAccountResultGenqlSelection & { __args: {input: RegisterCustomerInput} })
    /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
    refreshCustomerVerification?: (RefreshCustomerVerificationResultGenqlSelection & { __args: {emailAddress: Scalars['String']} })
    /** Update an existing Customer */
    updateCustomer?: (CustomerGenqlSelection & { __args: {input: UpdateCustomerInput} })
    /** Create a new Customer Address */
    createCustomerAddress?: (AddressGenqlSelection & { __args: {input: CreateAddressInput} })
    /** Update an existing Address */
    updateCustomerAddress?: (AddressGenqlSelection & { __args: {input: UpdateAddressInput} })
    /** Delete an existing Address */
    deleteCustomerAddress?: (SuccessGenqlSelection & { __args: {id: Scalars['ID']} })
    /**
     * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
     * 
     * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
     * provided here.
     */
    verifyCustomerAccount?: (VerifyCustomerAccountResultGenqlSelection & { __args: {token: Scalars['String'], password?: (Scalars['String'] | null)} })
    /** Update the password of the active Customer */
    updateCustomerPassword?: (UpdateCustomerPasswordResultGenqlSelection & { __args: {currentPassword: Scalars['String'], newPassword: Scalars['String']} })
    /**
     * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
     * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
     * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
     * that verification token to the Customer, which is then used to verify the change of email address.
     */
    requestUpdateCustomerEmailAddress?: (RequestUpdateCustomerEmailAddressResultGenqlSelection & { __args: {password: Scalars['String'], newEmailAddress: Scalars['String']} })
    /**
     * Confirm the update of the emailAddress with the provided token, which has been generated by the
     * `requestUpdateCustomerEmailAddress` mutation.
     */
    updateCustomerEmailAddress?: (UpdateCustomerEmailAddressResultGenqlSelection & { __args: {token: Scalars['String']} })
    /** Requests a password reset email to be sent */
    requestPasswordReset?: (RequestPasswordResetResultGenqlSelection & { __args: {emailAddress: Scalars['String']} })
    /** Resets a Customer's password based on the provided token */
    resetPassword?: (ResetPasswordResultGenqlSelection & { __args: {token: Scalars['String'], password: Scalars['String']} })
    createStripePaymentIntent?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AddressGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    fullName?: boolean | number
    company?: boolean | number
    streetLine1?: boolean | number
    streetLine2?: boolean | number
    city?: boolean | number
    province?: boolean | number
    postalCode?: boolean | number
    country?: CountryGenqlSelection
    phoneNumber?: boolean | number
    defaultShippingAddress?: boolean | number
    defaultBillingAddress?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AssetGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    type?: boolean | number
    fileSize?: boolean | number
    mimeType?: boolean | number
    width?: boolean | number
    height?: boolean | number
    source?: boolean | number
    preview?: boolean | number
    focalPoint?: CoordinateGenqlSelection
    tags?: TagGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CoordinateGenqlSelection{
    x?: boolean | number
    y?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AssetListGenqlSelection{
    items?: AssetGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CurrentUserGenqlSelection{
    id?: boolean | number
    identifier?: boolean | number
    channels?: CurrentUserChannelGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CurrentUserChannelGenqlSelection{
    id?: boolean | number
    token?: boolean | number
    code?: boolean | number
    permissions?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChannelGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    code?: boolean | number
    token?: boolean | number
    defaultTaxZone?: ZoneGenqlSelection
    defaultShippingZone?: ZoneGenqlSelection
    defaultLanguageCode?: boolean | number
    availableLanguageCodes?: boolean | number
    /** @deprecated Use defaultCurrencyCode instead */
    currencyCode?: boolean | number
    defaultCurrencyCode?: boolean | number
    availableCurrencyCodes?: boolean | number
    /** Not yet used - will be implemented in a future release. */
    trackInventory?: boolean | number
    /** Not yet used - will be implemented in a future release. */
    outOfStockThreshold?: boolean | number
    pricesIncludeTax?: boolean | number
    seller?: SellerGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    breadcrumbs?: CollectionBreadcrumbGenqlSelection
    position?: boolean | number
    description?: boolean | number
    featuredAsset?: AssetGenqlSelection
    assets?: AssetGenqlSelection
    parent?: CollectionGenqlSelection
    parentId?: boolean | number
    children?: CollectionGenqlSelection
    filters?: ConfigurableOperationGenqlSelection
    translations?: CollectionTranslationGenqlSelection
    productVariants?: (ProductVariantListGenqlSelection & { __args?: {options?: (ProductVariantListOptions | null)} })
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionBreadcrumbGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CollectionListGenqlSelection{
    items?: CollectionGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export interface NativeAuthStrategyErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned if the user authentication credentials are not valid */
export interface InvalidCredentialsErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    authenticationError?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned if there is an error in transitioning the Order state */
export interface OrderStateTransitionErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    transitionError?: boolean | number
    fromState?: boolean | number
    toState?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export interface EmailAddressConflictErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export interface GuestCheckoutErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    errorDetail?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when the maximum order size limit has been reached. */
export interface OrderLimitErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    maxItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to set a negative OrderLine quantity. */
export interface NegativeQuantityErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to add more items to the Order than are available */
export interface InsufficientStockErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    quantityAvailable?: boolean | number
    order?: OrderGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeInvalidErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    couponCode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeExpiredErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    couponCode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned if the provided coupon code is invalid */
export interface CouponCodeLimitErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    couponCode?: boolean | number
    limit?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export interface OrderModificationErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export interface IneligibleShippingMethodErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export interface NoActiveOrderErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaginatedListGenqlSelection{
    items?: NodeGenqlSelection
    totalItems?: boolean | number
    on_AssetList?: AssetListGenqlSelection
    on_CollectionList?: CollectionListGenqlSelection
    on_CustomerList?: CustomerListGenqlSelection
    on_FacetList?: FacetListGenqlSelection
    on_FacetValueList?: FacetValueListGenqlSelection
    on_HistoryEntryList?: HistoryEntryListGenqlSelection
    on_OrderList?: OrderListGenqlSelection
    on_ProductList?: ProductListGenqlSelection
    on_ProductVariantList?: ProductVariantListGenqlSelection
    on_PromotionList?: PromotionListGenqlSelection
    on_CountryList?: CountryListGenqlSelection
    on_ProvinceList?: ProvinceListGenqlSelection
    on_RoleList?: RoleListGenqlSelection
    on_ShippingMethodList?: ShippingMethodListGenqlSelection
    on_TagList?: TagListGenqlSelection
    on_TaxRateList?: TaxRateListGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NodeGenqlSelection{
    id?: boolean | number
    on_Address?: AddressGenqlSelection
    on_Asset?: AssetGenqlSelection
    on_Channel?: ChannelGenqlSelection
    on_Collection?: CollectionGenqlSelection
    on_CustomerGroup?: CustomerGroupGenqlSelection
    on_Customer?: CustomerGenqlSelection
    on_FacetValue?: FacetValueGenqlSelection
    on_Facet?: FacetGenqlSelection
    on_HistoryEntry?: HistoryEntryGenqlSelection
    on_Order?: OrderGenqlSelection
    on_OrderLine?: OrderLineGenqlSelection
    on_Payment?: PaymentGenqlSelection
    on_Refund?: RefundGenqlSelection
    on_Fulfillment?: FulfillmentGenqlSelection
    on_Surcharge?: SurchargeGenqlSelection
    on_PaymentMethod?: PaymentMethodGenqlSelection
    on_ProductOptionGroup?: ProductOptionGroupGenqlSelection
    on_ProductOption?: ProductOptionGenqlSelection
    on_Product?: ProductGenqlSelection
    on_ProductVariant?: ProductVariantGenqlSelection
    on_Promotion?: PromotionGenqlSelection
    on_Country?: CountryGenqlSelection
    on_Province?: ProvinceGenqlSelection
    on_Role?: RoleGenqlSelection
    on_Seller?: SellerGenqlSelection
    on_ShippingMethod?: ShippingMethodGenqlSelection
    on_Tag?: TagGenqlSelection
    on_TaxCategory?: TaxCategoryGenqlSelection
    on_TaxRate?: TaxRateGenqlSelection
    on_User?: UserGenqlSelection
    on_AuthenticationMethod?: AuthenticationMethodGenqlSelection
    on_Zone?: ZoneGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ErrorResultGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    on_NativeAuthStrategyError?: NativeAuthStrategyErrorGenqlSelection
    on_InvalidCredentialsError?: InvalidCredentialsErrorGenqlSelection
    on_OrderStateTransitionError?: OrderStateTransitionErrorGenqlSelection
    on_EmailAddressConflictError?: EmailAddressConflictErrorGenqlSelection
    on_GuestCheckoutError?: GuestCheckoutErrorGenqlSelection
    on_OrderLimitError?: OrderLimitErrorGenqlSelection
    on_NegativeQuantityError?: NegativeQuantityErrorGenqlSelection
    on_InsufficientStockError?: InsufficientStockErrorGenqlSelection
    on_CouponCodeInvalidError?: CouponCodeInvalidErrorGenqlSelection
    on_CouponCodeExpiredError?: CouponCodeExpiredErrorGenqlSelection
    on_CouponCodeLimitError?: CouponCodeLimitErrorGenqlSelection
    on_OrderModificationError?: OrderModificationErrorGenqlSelection
    on_IneligibleShippingMethodError?: IneligibleShippingMethodErrorGenqlSelection
    on_NoActiveOrderError?: NoActiveOrderErrorGenqlSelection
    on_OrderPaymentStateError?: OrderPaymentStateErrorGenqlSelection
    on_IneligiblePaymentMethodError?: IneligiblePaymentMethodErrorGenqlSelection
    on_PaymentFailedError?: PaymentFailedErrorGenqlSelection
    on_PaymentDeclinedError?: PaymentDeclinedErrorGenqlSelection
    on_AlreadyLoggedInError?: AlreadyLoggedInErrorGenqlSelection
    on_MissingPasswordError?: MissingPasswordErrorGenqlSelection
    on_PasswordValidationError?: PasswordValidationErrorGenqlSelection
    on_PasswordAlreadySetError?: PasswordAlreadySetErrorGenqlSelection
    on_VerificationTokenInvalidError?: VerificationTokenInvalidErrorGenqlSelection
    on_VerificationTokenExpiredError?: VerificationTokenExpiredErrorGenqlSelection
    on_IdentifierChangeTokenInvalidError?: IdentifierChangeTokenInvalidErrorGenqlSelection
    on_IdentifierChangeTokenExpiredError?: IdentifierChangeTokenExpiredErrorGenqlSelection
    on_PasswordResetTokenInvalidError?: PasswordResetTokenInvalidErrorGenqlSelection
    on_PasswordResetTokenExpiredError?: PasswordResetTokenExpiredErrorGenqlSelection
    on_NotVerifiedError?: NotVerifiedErrorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AdjustmentGenqlSelection{
    adjustmentSource?: boolean | number
    type?: boolean | number
    description?: boolean | number
    amount?: boolean | number
    data?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaxLineGenqlSelection{
    description?: boolean | number
    taxRate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigArgGenqlSelection{
    name?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigArgDefinitionGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    required?: boolean | number
    defaultValue?: boolean | number
    label?: boolean | number
    description?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigurableOperationGenqlSelection{
    code?: boolean | number
    args?: ConfigArgGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigurableOperationDefinitionGenqlSelection{
    code?: boolean | number
    args?: ConfigArgDefinitionGenqlSelection
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DeletionResponseGenqlSelection{
    result?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ConfigArgInput {name: Scalars['String'],
/** A JSON stringified representation of the actual value */
value: Scalars['String']}

export interface ConfigurableOperationInput {code: Scalars['String'],arguments: ConfigArgInput[]}


/** Operators for filtering on a String field */
export interface StringOperators {eq?: (Scalars['String'] | null),notEq?: (Scalars['String'] | null),contains?: (Scalars['String'] | null),notContains?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),notIn?: (Scalars['String'][] | null),regex?: (Scalars['String'] | null),isNull?: (Scalars['Boolean'] | null)}


/** Operators for filtering on an ID field */
export interface IDOperators {eq?: (Scalars['String'] | null),notEq?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),notIn?: (Scalars['String'][] | null),isNull?: (Scalars['Boolean'] | null)}


/** Operators for filtering on a Boolean field */
export interface BooleanOperators {eq?: (Scalars['Boolean'] | null),isNull?: (Scalars['Boolean'] | null)}

export interface NumberRange {start: Scalars['Float'],end: Scalars['Float']}


/** Operators for filtering on a Int or Float field */
export interface NumberOperators {eq?: (Scalars['Float'] | null),lt?: (Scalars['Float'] | null),lte?: (Scalars['Float'] | null),gt?: (Scalars['Float'] | null),gte?: (Scalars['Float'] | null),between?: (NumberRange | null),isNull?: (Scalars['Boolean'] | null)}

export interface DateRange {start: Scalars['DateTime'],end: Scalars['DateTime']}


/** Operators for filtering on a DateTime field */
export interface DateOperators {eq?: (Scalars['DateTime'] | null),before?: (Scalars['DateTime'] | null),after?: (Scalars['DateTime'] | null),between?: (DateRange | null),isNull?: (Scalars['Boolean'] | null)}


/** Operators for filtering on a list of String fields */
export interface StringListOperators {inList: Scalars['String']}


/** Operators for filtering on a list of Number fields */
export interface NumberListOperators {inList: Scalars['Float']}


/** Operators for filtering on a list of Boolean fields */
export interface BooleanListOperators {inList: Scalars['Boolean']}


/** Operators for filtering on a list of ID fields */
export interface IDListOperators {inList: Scalars['ID']}


/** Operators for filtering on a list of Date fields */
export interface DateListOperators {inList: Scalars['DateTime']}


/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 * 
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export interface FacetValueFilterInput {and?: (Scalars['ID'] | null),or?: (Scalars['ID'][] | null)}

export interface SearchInput {term?: (Scalars['String'] | null),facetValueFilters?: (FacetValueFilterInput[] | null),collectionId?: (Scalars['ID'] | null),collectionSlug?: (Scalars['String'] | null),groupByProduct?: (Scalars['Boolean'] | null),take?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),sort?: (SearchResultSortParameter | null),inStock?: (Scalars['Boolean'] | null)}

export interface SearchResultSortParameter {name?: (SortOrder | null),price?: (SortOrder | null)}

export interface CreateCustomerInput {title?: (Scalars['String'] | null),firstName: Scalars['String'],lastName: Scalars['String'],phoneNumber?: (Scalars['String'] | null),emailAddress: Scalars['String'],customFields?: (Scalars['JSON'] | null)}


/**
 * Input used to create an Address.
 * 
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export interface CreateAddressInput {fullName?: (Scalars['String'] | null),company?: (Scalars['String'] | null),streetLine1: Scalars['String'],streetLine2?: (Scalars['String'] | null),city?: (Scalars['String'] | null),province?: (Scalars['String'] | null),postalCode?: (Scalars['String'] | null),countryCode: Scalars['String'],phoneNumber?: (Scalars['String'] | null),defaultShippingAddress?: (Scalars['Boolean'] | null),defaultBillingAddress?: (Scalars['Boolean'] | null),customFields?: (Scalars['JSON'] | null)}


/**
 * Input used to update an Address.
 * 
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export interface UpdateAddressInput {id: Scalars['ID'],fullName?: (Scalars['String'] | null),company?: (Scalars['String'] | null),streetLine1?: (Scalars['String'] | null),streetLine2?: (Scalars['String'] | null),city?: (Scalars['String'] | null),province?: (Scalars['String'] | null),postalCode?: (Scalars['String'] | null),countryCode?: (Scalars['String'] | null),phoneNumber?: (Scalars['String'] | null),defaultShippingAddress?: (Scalars['Boolean'] | null),defaultBillingAddress?: (Scalars['Boolean'] | null),customFields?: (Scalars['JSON'] | null)}


/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export interface SuccessGenqlSelection{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShippingMethodQuoteGenqlSelection{
    id?: boolean | number
    price?: boolean | number
    priceWithTax?: boolean | number
    code?: boolean | number
    name?: boolean | number
    description?: boolean | number
    /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
    metadata?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodQuoteGenqlSelection{
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
    description?: boolean | number
    isEligible?: boolean | number
    eligibilityMessage?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateOrderItemsResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_OrderModificationError?:OrderModificationErrorGenqlSelection,
    on_OrderLimitError?:OrderLimitErrorGenqlSelection,
    on_NegativeQuantityError?:NegativeQuantityErrorGenqlSelection,
    on_InsufficientStockError?:InsufficientStockErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface RemoveOrderItemsResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_OrderModificationError?:OrderModificationErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface SetOrderShippingMethodResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_OrderModificationError?:OrderModificationErrorGenqlSelection,
    on_IneligibleShippingMethodError?:IneligibleShippingMethodErrorGenqlSelection,
    on_NoActiveOrderError?:NoActiveOrderErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface ApplyCouponCodeResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_CouponCodeExpiredError?:CouponCodeExpiredErrorGenqlSelection,
    on_CouponCodeInvalidError?:CouponCodeInvalidErrorGenqlSelection,
    on_CouponCodeLimitError?:CouponCodeLimitErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface CustomFieldGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    ui?: boolean | number
    on_StringCustomFieldConfig?: StringCustomFieldConfigGenqlSelection
    on_LocaleStringCustomFieldConfig?: LocaleStringCustomFieldConfigGenqlSelection
    on_IntCustomFieldConfig?: IntCustomFieldConfigGenqlSelection
    on_FloatCustomFieldConfig?: FloatCustomFieldConfigGenqlSelection
    on_BooleanCustomFieldConfig?: BooleanCustomFieldConfigGenqlSelection
    on_DateTimeCustomFieldConfig?: DateTimeCustomFieldConfigGenqlSelection
    on_RelationCustomFieldConfig?: RelationCustomFieldConfigGenqlSelection
    on_TextCustomFieldConfig?: TextCustomFieldConfigGenqlSelection
    on_LocaleTextCustomFieldConfig?: LocaleTextCustomFieldConfigGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    length?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    pattern?: boolean | number
    options?: StringFieldOptionGenqlSelection
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringFieldOptionGenqlSelection{
    value?: boolean | number
    label?: LocalizedStringGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocaleStringCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    length?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    pattern?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IntCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    min?: boolean | number
    max?: boolean | number
    step?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FloatCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    min?: boolean | number
    max?: boolean | number
    step?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BooleanCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export interface DateTimeCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    min?: boolean | number
    max?: boolean | number
    step?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RelationCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    entity?: boolean | number
    scalarFields?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TextCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocaleTextCustomFieldConfigGenqlSelection{
    name?: boolean | number
    type?: boolean | number
    list?: boolean | number
    label?: LocalizedStringGenqlSelection
    description?: LocalizedStringGenqlSelection
    readonly?: boolean | number
    internal?: boolean | number
    nullable?: boolean | number
    requiresPermission?: boolean | number
    ui?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocalizedStringGenqlSelection{
    languageCode?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomFieldConfigGenqlSelection{
    on_StringCustomFieldConfig?:StringCustomFieldConfigGenqlSelection,
    on_LocaleStringCustomFieldConfig?:LocaleStringCustomFieldConfigGenqlSelection,
    on_IntCustomFieldConfig?:IntCustomFieldConfigGenqlSelection,
    on_FloatCustomFieldConfig?:FloatCustomFieldConfigGenqlSelection,
    on_BooleanCustomFieldConfig?:BooleanCustomFieldConfigGenqlSelection,
    on_DateTimeCustomFieldConfig?:DateTimeCustomFieldConfigGenqlSelection,
    on_RelationCustomFieldConfig?:RelationCustomFieldConfigGenqlSelection,
    on_TextCustomFieldConfig?:TextCustomFieldConfigGenqlSelection,
    on_LocaleTextCustomFieldConfig?:LocaleTextCustomFieldConfigGenqlSelection,
    on_CustomField?: CustomFieldGenqlSelection,
    __typename?: boolean | number
}

export interface CustomerGroupGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    customers?: (CustomerListGenqlSelection & { __args?: {options?: (CustomerListOptions | null)} })
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomerListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (CustomerSortParameter | null),
/** Allows the results to be filtered */
filter?: (CustomerFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface CustomerGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    title?: boolean | number
    firstName?: boolean | number
    lastName?: boolean | number
    phoneNumber?: boolean | number
    emailAddress?: boolean | number
    addresses?: AddressGenqlSelection
    orders?: (OrderListGenqlSelection & { __args?: {options?: (OrderListOptions | null)} })
    user?: UserGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CustomerListGenqlSelection{
    items?: CustomerGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetValueGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    facet?: FacetGenqlSelection
    facetId?: boolean | number
    name?: boolean | number
    code?: boolean | number
    translations?: FacetValueTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetValueTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    code?: boolean | number
    values?: FacetValueGenqlSelection
    /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
    valueList?: (FacetValueListGenqlSelection & { __args?: {options?: (FacetValueListOptions | null)} })
    translations?: FacetTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetListGenqlSelection{
    items?: FacetGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FacetValueListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (FacetValueSortParameter | null),
/** Allows the results to be filtered */
filter?: (FacetValueFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface FacetValueListGenqlSelection{
    items?: FacetValueGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HistoryEntryGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    type?: boolean | number
    data?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HistoryEntryListGenqlSelection{
    items?: HistoryEntryGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HistoryEntryListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (HistoryEntrySortParameter | null),
/** Allows the results to be filtered */
filter?: (HistoryEntryFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface OrderGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    type?: boolean | number
    /**
     * The date & time that the Order was placed, i.e. the Customer
     * completed the checkout and the Order is no longer "active"
     */
    orderPlacedAt?: boolean | number
    /** A unique code for the Order */
    code?: boolean | number
    state?: boolean | number
    /** An order is active as long as the payment process has not been completed */
    active?: boolean | number
    customer?: CustomerGenqlSelection
    shippingAddress?: OrderAddressGenqlSelection
    billingAddress?: OrderAddressGenqlSelection
    lines?: OrderLineGenqlSelection
    /**
     * Surcharges are arbitrary modifications to the Order total which are neither
     * ProductVariants nor discounts resulting from applied Promotions. For example,
     * one-off discounts based on customer interaction, or surcharges based on payment
     * methods.
     */
    surcharges?: SurchargeGenqlSelection
    discounts?: DiscountGenqlSelection
    /** An array of all coupon codes applied to the Order */
    couponCodes?: boolean | number
    /** Promotions applied to the order. Only gets populated after the payment process has completed. */
    promotions?: PromotionGenqlSelection
    payments?: PaymentGenqlSelection
    fulfillments?: FulfillmentGenqlSelection
    totalQuantity?: boolean | number
    /**
     * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
     * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
     * To get a total of all OrderLines which does not account for prorated discounts, use the
     * sum of `OrderLine.discountedLinePrice` values.
     */
    subTotal?: boolean | number
    /** Same as subTotal, but inclusive of tax */
    subTotalWithTax?: boolean | number
    currencyCode?: boolean | number
    shippingLines?: ShippingLineGenqlSelection
    shipping?: boolean | number
    shippingWithTax?: boolean | number
    /** Equal to subTotal plus shipping */
    total?: boolean | number
    /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
    totalWithTax?: boolean | number
    /** A summary of the taxes being applied to this Order */
    taxSummary?: OrderTaxSummaryGenqlSelection
    history?: (HistoryEntryListGenqlSelection & { __args?: {options?: (HistoryEntryListOptions | null)} })
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export interface OrderTaxSummaryGenqlSelection{
    /** A description of this tax */
    description?: boolean | number
    /** The taxRate as a percentage */
    taxRate?: boolean | number
    /** The total net price of OrderLines to which this taxRate applies */
    taxBase?: boolean | number
    /** The total tax being applied to the Order at this taxRate */
    taxTotal?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrderAddressGenqlSelection{
    fullName?: boolean | number
    company?: boolean | number
    streetLine1?: boolean | number
    streetLine2?: boolean | number
    city?: boolean | number
    province?: boolean | number
    postalCode?: boolean | number
    country?: boolean | number
    countryCode?: boolean | number
    phoneNumber?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrderListGenqlSelection{
    items?: OrderGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShippingLineGenqlSelection{
    id?: boolean | number
    shippingMethod?: ShippingMethodGenqlSelection
    price?: boolean | number
    priceWithTax?: boolean | number
    discountedPrice?: boolean | number
    discountedPriceWithTax?: boolean | number
    discounts?: DiscountGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscountGenqlSelection{
    adjustmentSource?: boolean | number
    type?: boolean | number
    description?: boolean | number
    amount?: boolean | number
    amountWithTax?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrderLineGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    productVariant?: ProductVariantGenqlSelection
    featuredAsset?: AssetGenqlSelection
    /** The price of a single unit, excluding tax and discounts */
    unitPrice?: boolean | number
    /** The price of a single unit, including tax but excluding discounts */
    unitPriceWithTax?: boolean | number
    /** Non-zero if the unitPrice has changed since it was initially added to Order */
    unitPriceChangeSinceAdded?: boolean | number
    /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
    unitPriceWithTaxChangeSinceAdded?: boolean | number
    /**
     * The price of a single unit including discounts, excluding tax.
     * 
     * If Order-level discounts have been applied, this will not be the
     * actual taxable unit price (see `proratedUnitPrice`), but is generally the
     * correct price to display to customers to avoid confusion
     * about the internal handling of distributed Order-level discounts.
     */
    discountedUnitPrice?: boolean | number
    /** The price of a single unit including discounts and tax */
    discountedUnitPriceWithTax?: boolean | number
    /**
     * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
     * and refund calculations.
     */
    proratedUnitPrice?: boolean | number
    /** The proratedUnitPrice including tax */
    proratedUnitPriceWithTax?: boolean | number
    /** The quantity of items purchased */
    quantity?: boolean | number
    /** The quantity at the time the Order was placed */
    orderPlacedQuantity?: boolean | number
    taxRate?: boolean | number
    /** The total price of the line excluding tax and discounts. */
    linePrice?: boolean | number
    /** The total price of the line including tax but excluding discounts. */
    linePriceWithTax?: boolean | number
    /** The price of the line including discounts, excluding tax */
    discountedLinePrice?: boolean | number
    /** The price of the line including discounts and tax */
    discountedLinePriceWithTax?: boolean | number
    /**
     * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
     * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
     * and refund calculations.
     */
    proratedLinePrice?: boolean | number
    /** The proratedLinePrice including tax */
    proratedLinePriceWithTax?: boolean | number
    /** The total tax on this line */
    lineTax?: boolean | number
    discounts?: DiscountGenqlSelection
    taxLines?: TaxLineGenqlSelection
    order?: OrderGenqlSelection
    fulfillmentLines?: FulfillmentLineGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    method?: boolean | number
    amount?: boolean | number
    state?: boolean | number
    transactionId?: boolean | number
    errorMessage?: boolean | number
    refunds?: RefundGenqlSelection
    metadata?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RefundLineGenqlSelection{
    orderLine?: OrderLineGenqlSelection
    orderLineId?: boolean | number
    quantity?: boolean | number
    refund?: RefundGenqlSelection
    refundId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RefundGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    items?: boolean | number
    shipping?: boolean | number
    adjustment?: boolean | number
    total?: boolean | number
    method?: boolean | number
    state?: boolean | number
    transactionId?: boolean | number
    reason?: boolean | number
    lines?: RefundLineGenqlSelection
    paymentId?: boolean | number
    metadata?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FulfillmentLineGenqlSelection{
    orderLine?: OrderLineGenqlSelection
    orderLineId?: boolean | number
    quantity?: boolean | number
    fulfillment?: FulfillmentGenqlSelection
    fulfillmentId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FulfillmentGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    lines?: FulfillmentLineGenqlSelection
    /** @deprecated Use the `lines` field instead */
    summary?: FulfillmentLineGenqlSelection
    state?: boolean | number
    method?: boolean | number
    trackingCode?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SurchargeGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    description?: boolean | number
    sku?: boolean | number
    taxLines?: TaxLineGenqlSelection
    price?: boolean | number
    priceWithTax?: boolean | number
    taxRate?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    code?: boolean | number
    description?: boolean | number
    enabled?: boolean | number
    checker?: ConfigurableOperationGenqlSelection
    handler?: ConfigurableOperationGenqlSelection
    translations?: PaymentMethodTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaymentMethodTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductOptionGroupGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    name?: boolean | number
    options?: ProductOptionGenqlSelection
    translations?: ProductOptionGroupTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductOptionGroupTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductOptionGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    name?: boolean | number
    groupId?: boolean | number
    group?: ProductOptionGroupGenqlSelection
    translations?: ProductOptionTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductOptionTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchReindexResponseGenqlSelection{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchResponseGenqlSelection{
    items?: SearchResultGenqlSelection
    totalItems?: boolean | number
    facetValues?: FacetValueResultGenqlSelection
    collections?: CollectionResultGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export interface FacetValueResultGenqlSelection{
    facetValue?: FacetValueGenqlSelection
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export interface CollectionResultGenqlSelection{
    collection?: CollectionGenqlSelection
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchResultAssetGenqlSelection{
    id?: boolean | number
    preview?: boolean | number
    focalPoint?: CoordinateGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SearchResultGenqlSelection{
    sku?: boolean | number
    slug?: boolean | number
    productId?: boolean | number
    productName?: boolean | number
    productAsset?: SearchResultAssetGenqlSelection
    productVariantId?: boolean | number
    productVariantName?: boolean | number
    productVariantAsset?: SearchResultAssetGenqlSelection
    price?: SearchResultPriceGenqlSelection
    priceWithTax?: SearchResultPriceGenqlSelection
    currencyCode?: boolean | number
    description?: boolean | number
    facetIds?: boolean | number
    facetValueIds?: boolean | number
    /** An array of ids of the Collections in which this result appears */
    collectionIds?: boolean | number
    /** A relevance score for the result. Differs between database implementations */
    score?: boolean | number
    inStock?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The price of a search result product, either as a range or as a single price */
export interface SearchResultPriceGenqlSelection{
    on_PriceRange?:PriceRangeGenqlSelection,
    on_SinglePrice?:SinglePriceGenqlSelection,
    __typename?: boolean | number
}


/** The price value where the result has a single price */
export interface SinglePriceGenqlSelection{
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The price range where the result has more than one price */
export interface PriceRangeGenqlSelection{
    min?: boolean | number
    max?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    enabled?: boolean | number
    featuredAsset?: AssetGenqlSelection
    assets?: AssetGenqlSelection
    /** Returns all ProductVariants */
    variants?: ProductVariantGenqlSelection
    /** Returns a paginated, sortable, filterable list of ProductVariants */
    variantList?: (ProductVariantListGenqlSelection & { __args?: {options?: (ProductVariantListOptions | null)} })
    optionGroups?: ProductOptionGroupGenqlSelection
    facetValues?: FacetValueGenqlSelection
    translations?: ProductTranslationGenqlSelection
    collections?: CollectionGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductListGenqlSelection{
    items?: ProductGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductVariantListGenqlSelection{
    items?: ProductVariantGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductVariantGenqlSelection{
    id?: boolean | number
    product?: ProductGenqlSelection
    productId?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    sku?: boolean | number
    name?: boolean | number
    featuredAsset?: AssetGenqlSelection
    assets?: AssetGenqlSelection
    price?: boolean | number
    currencyCode?: boolean | number
    priceWithTax?: boolean | number
    stockLevel?: boolean | number
    taxRateApplied?: TaxRateGenqlSelection
    taxCategory?: TaxCategoryGenqlSelection
    options?: ProductOptionGenqlSelection
    facetValues?: FacetValueGenqlSelection
    translations?: ProductVariantTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductVariantTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PromotionGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    startsAt?: boolean | number
    endsAt?: boolean | number
    couponCode?: boolean | number
    perCustomerUsageLimit?: boolean | number
    usageLimit?: boolean | number
    name?: boolean | number
    description?: boolean | number
    enabled?: boolean | number
    conditions?: ConfigurableOperationGenqlSelection
    actions?: ConfigurableOperationGenqlSelection
    translations?: PromotionTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PromotionTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PromotionListGenqlSelection{
    items?: PromotionGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegionGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    type?: boolean | number
    name?: boolean | number
    enabled?: boolean | number
    parent?: RegionGenqlSelection
    parentId?: boolean | number
    translations?: RegionTranslationGenqlSelection
    on_Country?: CountryGenqlSelection
    on_Province?: ProvinceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RegionTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * A Country of the world which your shop operates in.
 * 
 * The `code` field is typically a 2-character ISO code such as "GB", "US", "DE" etc. This code is used in certain inputs such as
 * `UpdateAddressInput` and `CreateAddressInput` to specify the country.
 */
export interface CountryGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    type?: boolean | number
    name?: boolean | number
    enabled?: boolean | number
    parent?: RegionGenqlSelection
    parentId?: boolean | number
    translations?: RegionTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CountryListGenqlSelection{
    items?: CountryGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProvinceGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    type?: boolean | number
    name?: boolean | number
    enabled?: boolean | number
    parent?: RegionGenqlSelection
    parentId?: boolean | number
    translations?: RegionTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProvinceListGenqlSelection{
    items?: ProvinceGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    code?: boolean | number
    description?: boolean | number
    permissions?: boolean | number
    channels?: ChannelGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleListGenqlSelection{
    items?: RoleGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SellerGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShippingMethodGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    code?: boolean | number
    name?: boolean | number
    description?: boolean | number
    fulfillmentHandlerCode?: boolean | number
    checker?: ConfigurableOperationGenqlSelection
    calculator?: ConfigurableOperationGenqlSelection
    translations?: ShippingMethodTranslationGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShippingMethodTranslationGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    languageCode?: boolean | number
    name?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShippingMethodListGenqlSelection{
    items?: ShippingMethodGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagListGenqlSelection{
    items?: TagGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaxCategoryGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    isDefault?: boolean | number
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaxRateGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    enabled?: boolean | number
    value?: boolean | number
    category?: TaxCategoryGenqlSelection
    zone?: ZoneGenqlSelection
    customerGroup?: CustomerGroupGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaxRateListGenqlSelection{
    items?: TaxRateGenqlSelection
    totalItems?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    identifier?: boolean | number
    verified?: boolean | number
    roles?: RoleGenqlSelection
    lastLogin?: boolean | number
    authenticationMethods?: AuthenticationMethodGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthenticationMethodGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    strategy?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ZoneGenqlSelection{
    id?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    name?: boolean | number
    members?: RegionGenqlSelection
    customFields?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export interface OrderPaymentStateErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export interface IneligiblePaymentMethodErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    eligibilityCheckerMessage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when a Payment fails due to an error. */
export interface PaymentFailedErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    paymentErrorMessage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when a Payment is declined by the payment provider. */
export interface PaymentDeclinedErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    paymentErrorMessage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to set the Customer for an Order when already logged in. */
export interface AlreadyLoggedInErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export interface MissingPasswordErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export interface PasswordValidationErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    validationErrorMessage?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export interface PasswordAlreadySetErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export interface VerificationTokenInvalidErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface VerificationTokenExpiredErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export interface IdentifierChangeTokenInvalidErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface IdentifierChangeTokenExpiredErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export interface PasswordResetTokenInvalidErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export interface PasswordResetTokenExpiredErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export interface NotVerifiedErrorGenqlSelection{
    errorCode?: boolean | number
    message?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthenticationInput {native?: (NativeAuthInput | null)}

export interface RegisterCustomerInput {emailAddress: Scalars['String'],title?: (Scalars['String'] | null),firstName?: (Scalars['String'] | null),lastName?: (Scalars['String'] | null),phoneNumber?: (Scalars['String'] | null),password?: (Scalars['String'] | null)}

export interface UpdateCustomerInput {title?: (Scalars['String'] | null),firstName?: (Scalars['String'] | null),lastName?: (Scalars['String'] | null),phoneNumber?: (Scalars['String'] | null),customFields?: (Scalars['JSON'] | null)}

export interface UpdateOrderInput {customFields?: (Scalars['JSON'] | null)}


/** Passed as input to the `addPaymentToOrder` mutation. */
export interface PaymentInput {
/** This field should correspond to the `code` property of a PaymentMethod. */
method: Scalars['String'],
/**
 * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
 * as the "metadata" argument. For example, it could contain an ID for the payment and other
 * data generated by the payment provider.
 */
metadata: Scalars['JSON']}

export interface CollectionListOptions {topLevelOnly?: (Scalars['Boolean'] | null),
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (CollectionSortParameter | null),
/** Allows the results to be filtered */
filter?: (CollectionFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface FacetListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (FacetSortParameter | null),
/** Allows the results to be filtered */
filter?: (FacetFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface OrderListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (OrderSortParameter | null),
/** Allows the results to be filtered */
filter?: (OrderFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface ProductListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (ProductSortParameter | null),
/** Allows the results to be filtered */
filter?: (ProductFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface ProductVariantListOptions {
/** Skips the first n results, for use in pagination */
skip?: (Scalars['Int'] | null),
/** Takes n results, for use in pagination */
take?: (Scalars['Int'] | null),
/** Specifies which properties to sort the results by */
sort?: (ProductVariantSortParameter | null),
/** Allows the results to be filtered */
filter?: (ProductVariantFilterParameter | null),
/** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
filterOperator?: (LogicalOperator | null)}

export interface AddPaymentToOrderResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_OrderPaymentStateError?:OrderPaymentStateErrorGenqlSelection,
    on_IneligiblePaymentMethodError?:IneligiblePaymentMethodErrorGenqlSelection,
    on_PaymentFailedError?:PaymentFailedErrorGenqlSelection,
    on_PaymentDeclinedError?:PaymentDeclinedErrorGenqlSelection,
    on_OrderStateTransitionError?:OrderStateTransitionErrorGenqlSelection,
    on_NoActiveOrderError?:NoActiveOrderErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface TransitionOrderToStateResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_OrderStateTransitionError?:OrderStateTransitionErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface SetCustomerForOrderResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_AlreadyLoggedInError?:AlreadyLoggedInErrorGenqlSelection,
    on_EmailAddressConflictError?:EmailAddressConflictErrorGenqlSelection,
    on_NoActiveOrderError?:NoActiveOrderErrorGenqlSelection,
    on_GuestCheckoutError?:GuestCheckoutErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface RegisterCustomerAccountResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_MissingPasswordError?:MissingPasswordErrorGenqlSelection,
    on_PasswordValidationError?:PasswordValidationErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface RefreshCustomerVerificationResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface VerifyCustomerAccountResultGenqlSelection{
    on_CurrentUser?:CurrentUserGenqlSelection,
    on_VerificationTokenInvalidError?:VerificationTokenInvalidErrorGenqlSelection,
    on_VerificationTokenExpiredError?:VerificationTokenExpiredErrorGenqlSelection,
    on_MissingPasswordError?:MissingPasswordErrorGenqlSelection,
    on_PasswordValidationError?:PasswordValidationErrorGenqlSelection,
    on_PasswordAlreadySetError?:PasswordAlreadySetErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface UpdateCustomerPasswordResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_InvalidCredentialsError?:InvalidCredentialsErrorGenqlSelection,
    on_PasswordValidationError?:PasswordValidationErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface RequestUpdateCustomerEmailAddressResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_InvalidCredentialsError?:InvalidCredentialsErrorGenqlSelection,
    on_EmailAddressConflictError?:EmailAddressConflictErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface UpdateCustomerEmailAddressResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_IdentifierChangeTokenInvalidError?:IdentifierChangeTokenInvalidErrorGenqlSelection,
    on_IdentifierChangeTokenExpiredError?:IdentifierChangeTokenExpiredErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface RequestPasswordResetResultGenqlSelection{
    on_Success?:SuccessGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface ResetPasswordResultGenqlSelection{
    on_CurrentUser?:CurrentUserGenqlSelection,
    on_PasswordResetTokenInvalidError?:PasswordResetTokenInvalidErrorGenqlSelection,
    on_PasswordResetTokenExpiredError?:PasswordResetTokenExpiredErrorGenqlSelection,
    on_PasswordValidationError?:PasswordValidationErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_NotVerifiedError?:NotVerifiedErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface NativeAuthenticationResultGenqlSelection{
    on_CurrentUser?:CurrentUserGenqlSelection,
    on_InvalidCredentialsError?:InvalidCredentialsErrorGenqlSelection,
    on_NotVerifiedError?:NotVerifiedErrorGenqlSelection,
    on_NativeAuthStrategyError?:NativeAuthStrategyErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface AuthenticationResultGenqlSelection{
    on_CurrentUser?:CurrentUserGenqlSelection,
    on_InvalidCredentialsError?:InvalidCredentialsErrorGenqlSelection,
    on_NotVerifiedError?:NotVerifiedErrorGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface ActiveOrderResultGenqlSelection{
    on_Order?:OrderGenqlSelection,
    on_NoActiveOrderError?:NoActiveOrderErrorGenqlSelection,
    on_Node?: NodeGenqlSelection,
    on_ErrorResult?: ErrorResultGenqlSelection,
    __typename?: boolean | number
}

export interface ProductVariantFilterParameter {id?: (IDOperators | null),productId?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),languageCode?: (StringOperators | null),sku?: (StringOperators | null),name?: (StringOperators | null),price?: (NumberOperators | null),currencyCode?: (StringOperators | null),priceWithTax?: (NumberOperators | null),stockLevel?: (StringOperators | null),_and?: (ProductVariantFilterParameter[] | null),_or?: (ProductVariantFilterParameter[] | null)}

export interface ProductVariantSortParameter {id?: (SortOrder | null),productId?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),sku?: (SortOrder | null),name?: (SortOrder | null),price?: (SortOrder | null),priceWithTax?: (SortOrder | null),stockLevel?: (SortOrder | null)}

export interface CustomerFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),title?: (StringOperators | null),firstName?: (StringOperators | null),lastName?: (StringOperators | null),phoneNumber?: (StringOperators | null),emailAddress?: (StringOperators | null),_and?: (CustomerFilterParameter[] | null),_or?: (CustomerFilterParameter[] | null)}

export interface CustomerSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),title?: (SortOrder | null),firstName?: (SortOrder | null),lastName?: (SortOrder | null),phoneNumber?: (SortOrder | null),emailAddress?: (SortOrder | null)}

export interface OrderFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),type?: (StringOperators | null),orderPlacedAt?: (DateOperators | null),code?: (StringOperators | null),state?: (StringOperators | null),active?: (BooleanOperators | null),totalQuantity?: (NumberOperators | null),subTotal?: (NumberOperators | null),subTotalWithTax?: (NumberOperators | null),currencyCode?: (StringOperators | null),shipping?: (NumberOperators | null),shippingWithTax?: (NumberOperators | null),total?: (NumberOperators | null),totalWithTax?: (NumberOperators | null),_and?: (OrderFilterParameter[] | null),_or?: (OrderFilterParameter[] | null)}

export interface OrderSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),orderPlacedAt?: (SortOrder | null),code?: (SortOrder | null),state?: (SortOrder | null),totalQuantity?: (SortOrder | null),subTotal?: (SortOrder | null),subTotalWithTax?: (SortOrder | null),shipping?: (SortOrder | null),shippingWithTax?: (SortOrder | null),total?: (SortOrder | null),totalWithTax?: (SortOrder | null)}

export interface FacetValueFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),languageCode?: (StringOperators | null),facetId?: (IDOperators | null),name?: (StringOperators | null),code?: (StringOperators | null),_and?: (FacetValueFilterParameter[] | null),_or?: (FacetValueFilterParameter[] | null)}

export interface FacetValueSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),facetId?: (SortOrder | null),name?: (SortOrder | null),code?: (SortOrder | null)}

export interface HistoryEntryFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),type?: (StringOperators | null),_and?: (HistoryEntryFilterParameter[] | null),_or?: (HistoryEntryFilterParameter[] | null)}

export interface HistoryEntrySortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface CollectionFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),languageCode?: (StringOperators | null),name?: (StringOperators | null),slug?: (StringOperators | null),position?: (NumberOperators | null),description?: (StringOperators | null),parentId?: (IDOperators | null),_and?: (CollectionFilterParameter[] | null),_or?: (CollectionFilterParameter[] | null)}

export interface CollectionSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),name?: (SortOrder | null),slug?: (SortOrder | null),position?: (SortOrder | null),description?: (SortOrder | null),parentId?: (SortOrder | null)}

export interface FacetFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),languageCode?: (StringOperators | null),name?: (StringOperators | null),code?: (StringOperators | null),_and?: (FacetFilterParameter[] | null),_or?: (FacetFilterParameter[] | null)}

export interface FacetSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),name?: (SortOrder | null),code?: (SortOrder | null)}

export interface ProductFilterParameter {id?: (IDOperators | null),createdAt?: (DateOperators | null),updatedAt?: (DateOperators | null),languageCode?: (StringOperators | null),name?: (StringOperators | null),slug?: (StringOperators | null),description?: (StringOperators | null),enabled?: (BooleanOperators | null),_and?: (ProductFilterParameter[] | null),_or?: (ProductFilterParameter[] | null)}

export interface ProductSortParameter {id?: (SortOrder | null),createdAt?: (SortOrder | null),updatedAt?: (SortOrder | null),name?: (SortOrder | null),slug?: (SortOrder | null),description?: (SortOrder | null)}

export interface NativeAuthInput {username: Scalars['String'],password: Scalars['String']}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Address_possibleTypes: string[] = ['Address']
    export const isAddress = (obj?: { __typename?: any } | null): obj is Address => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAddress"')
      return Address_possibleTypes.includes(obj.__typename)
    }
    


    const Asset_possibleTypes: string[] = ['Asset']
    export const isAsset = (obj?: { __typename?: any } | null): obj is Asset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAsset"')
      return Asset_possibleTypes.includes(obj.__typename)
    }
    


    const Coordinate_possibleTypes: string[] = ['Coordinate']
    export const isCoordinate = (obj?: { __typename?: any } | null): obj is Coordinate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCoordinate"')
      return Coordinate_possibleTypes.includes(obj.__typename)
    }
    


    const AssetList_possibleTypes: string[] = ['AssetList']
    export const isAssetList = (obj?: { __typename?: any } | null): obj is AssetList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAssetList"')
      return AssetList_possibleTypes.includes(obj.__typename)
    }
    


    const CurrentUser_possibleTypes: string[] = ['CurrentUser']
    export const isCurrentUser = (obj?: { __typename?: any } | null): obj is CurrentUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCurrentUser"')
      return CurrentUser_possibleTypes.includes(obj.__typename)
    }
    


    const CurrentUserChannel_possibleTypes: string[] = ['CurrentUserChannel']
    export const isCurrentUserChannel = (obj?: { __typename?: any } | null): obj is CurrentUserChannel => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCurrentUserChannel"')
      return CurrentUserChannel_possibleTypes.includes(obj.__typename)
    }
    


    const Channel_possibleTypes: string[] = ['Channel']
    export const isChannel = (obj?: { __typename?: any } | null): obj is Channel => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChannel"')
      return Channel_possibleTypes.includes(obj.__typename)
    }
    


    const Collection_possibleTypes: string[] = ['Collection']
    export const isCollection = (obj?: { __typename?: any } | null): obj is Collection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollection"')
      return Collection_possibleTypes.includes(obj.__typename)
    }
    


    const CollectionBreadcrumb_possibleTypes: string[] = ['CollectionBreadcrumb']
    export const isCollectionBreadcrumb = (obj?: { __typename?: any } | null): obj is CollectionBreadcrumb => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionBreadcrumb"')
      return CollectionBreadcrumb_possibleTypes.includes(obj.__typename)
    }
    


    const CollectionTranslation_possibleTypes: string[] = ['CollectionTranslation']
    export const isCollectionTranslation = (obj?: { __typename?: any } | null): obj is CollectionTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionTranslation"')
      return CollectionTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const CollectionList_possibleTypes: string[] = ['CollectionList']
    export const isCollectionList = (obj?: { __typename?: any } | null): obj is CollectionList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionList"')
      return CollectionList_possibleTypes.includes(obj.__typename)
    }
    


    const NativeAuthStrategyError_possibleTypes: string[] = ['NativeAuthStrategyError']
    export const isNativeAuthStrategyError = (obj?: { __typename?: any } | null): obj is NativeAuthStrategyError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNativeAuthStrategyError"')
      return NativeAuthStrategyError_possibleTypes.includes(obj.__typename)
    }
    


    const InvalidCredentialsError_possibleTypes: string[] = ['InvalidCredentialsError']
    export const isInvalidCredentialsError = (obj?: { __typename?: any } | null): obj is InvalidCredentialsError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInvalidCredentialsError"')
      return InvalidCredentialsError_possibleTypes.includes(obj.__typename)
    }
    


    const OrderStateTransitionError_possibleTypes: string[] = ['OrderStateTransitionError']
    export const isOrderStateTransitionError = (obj?: { __typename?: any } | null): obj is OrderStateTransitionError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderStateTransitionError"')
      return OrderStateTransitionError_possibleTypes.includes(obj.__typename)
    }
    


    const EmailAddressConflictError_possibleTypes: string[] = ['EmailAddressConflictError']
    export const isEmailAddressConflictError = (obj?: { __typename?: any } | null): obj is EmailAddressConflictError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEmailAddressConflictError"')
      return EmailAddressConflictError_possibleTypes.includes(obj.__typename)
    }
    


    const GuestCheckoutError_possibleTypes: string[] = ['GuestCheckoutError']
    export const isGuestCheckoutError = (obj?: { __typename?: any } | null): obj is GuestCheckoutError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGuestCheckoutError"')
      return GuestCheckoutError_possibleTypes.includes(obj.__typename)
    }
    


    const OrderLimitError_possibleTypes: string[] = ['OrderLimitError']
    export const isOrderLimitError = (obj?: { __typename?: any } | null): obj is OrderLimitError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderLimitError"')
      return OrderLimitError_possibleTypes.includes(obj.__typename)
    }
    


    const NegativeQuantityError_possibleTypes: string[] = ['NegativeQuantityError']
    export const isNegativeQuantityError = (obj?: { __typename?: any } | null): obj is NegativeQuantityError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNegativeQuantityError"')
      return NegativeQuantityError_possibleTypes.includes(obj.__typename)
    }
    


    const InsufficientStockError_possibleTypes: string[] = ['InsufficientStockError']
    export const isInsufficientStockError = (obj?: { __typename?: any } | null): obj is InsufficientStockError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isInsufficientStockError"')
      return InsufficientStockError_possibleTypes.includes(obj.__typename)
    }
    


    const CouponCodeInvalidError_possibleTypes: string[] = ['CouponCodeInvalidError']
    export const isCouponCodeInvalidError = (obj?: { __typename?: any } | null): obj is CouponCodeInvalidError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCouponCodeInvalidError"')
      return CouponCodeInvalidError_possibleTypes.includes(obj.__typename)
    }
    


    const CouponCodeExpiredError_possibleTypes: string[] = ['CouponCodeExpiredError']
    export const isCouponCodeExpiredError = (obj?: { __typename?: any } | null): obj is CouponCodeExpiredError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCouponCodeExpiredError"')
      return CouponCodeExpiredError_possibleTypes.includes(obj.__typename)
    }
    


    const CouponCodeLimitError_possibleTypes: string[] = ['CouponCodeLimitError']
    export const isCouponCodeLimitError = (obj?: { __typename?: any } | null): obj is CouponCodeLimitError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCouponCodeLimitError"')
      return CouponCodeLimitError_possibleTypes.includes(obj.__typename)
    }
    


    const OrderModificationError_possibleTypes: string[] = ['OrderModificationError']
    export const isOrderModificationError = (obj?: { __typename?: any } | null): obj is OrderModificationError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderModificationError"')
      return OrderModificationError_possibleTypes.includes(obj.__typename)
    }
    


    const IneligibleShippingMethodError_possibleTypes: string[] = ['IneligibleShippingMethodError']
    export const isIneligibleShippingMethodError = (obj?: { __typename?: any } | null): obj is IneligibleShippingMethodError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIneligibleShippingMethodError"')
      return IneligibleShippingMethodError_possibleTypes.includes(obj.__typename)
    }
    


    const NoActiveOrderError_possibleTypes: string[] = ['NoActiveOrderError']
    export const isNoActiveOrderError = (obj?: { __typename?: any } | null): obj is NoActiveOrderError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNoActiveOrderError"')
      return NoActiveOrderError_possibleTypes.includes(obj.__typename)
    }
    


    const PaginatedList_possibleTypes: string[] = ['AssetList','CollectionList','CustomerList','FacetList','FacetValueList','HistoryEntryList','OrderList','ProductList','ProductVariantList','PromotionList','CountryList','ProvinceList','RoleList','ShippingMethodList','TagList','TaxRateList']
    export const isPaginatedList = (obj?: { __typename?: any } | null): obj is PaginatedList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaginatedList"')
      return PaginatedList_possibleTypes.includes(obj.__typename)
    }
    


    const Node_possibleTypes: string[] = ['Address','Asset','Channel','Collection','CustomerGroup','Customer','FacetValue','Facet','HistoryEntry','Order','OrderLine','Payment','Refund','Fulfillment','Surcharge','PaymentMethod','ProductOptionGroup','ProductOption','Product','ProductVariant','Promotion','Country','Province','Role','Seller','ShippingMethod','Tag','TaxCategory','TaxRate','User','AuthenticationMethod','Zone']
    export const isNode = (obj?: { __typename?: any } | null): obj is Node => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNode"')
      return Node_possibleTypes.includes(obj.__typename)
    }
    


    const ErrorResult_possibleTypes: string[] = ['NativeAuthStrategyError','InvalidCredentialsError','OrderStateTransitionError','EmailAddressConflictError','GuestCheckoutError','OrderLimitError','NegativeQuantityError','InsufficientStockError','CouponCodeInvalidError','CouponCodeExpiredError','CouponCodeLimitError','OrderModificationError','IneligibleShippingMethodError','NoActiveOrderError','OrderPaymentStateError','IneligiblePaymentMethodError','PaymentFailedError','PaymentDeclinedError','AlreadyLoggedInError','MissingPasswordError','PasswordValidationError','PasswordAlreadySetError','VerificationTokenInvalidError','VerificationTokenExpiredError','IdentifierChangeTokenInvalidError','IdentifierChangeTokenExpiredError','PasswordResetTokenInvalidError','PasswordResetTokenExpiredError','NotVerifiedError']
    export const isErrorResult = (obj?: { __typename?: any } | null): obj is ErrorResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isErrorResult"')
      return ErrorResult_possibleTypes.includes(obj.__typename)
    }
    


    const Adjustment_possibleTypes: string[] = ['Adjustment']
    export const isAdjustment = (obj?: { __typename?: any } | null): obj is Adjustment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAdjustment"')
      return Adjustment_possibleTypes.includes(obj.__typename)
    }
    


    const TaxLine_possibleTypes: string[] = ['TaxLine']
    export const isTaxLine = (obj?: { __typename?: any } | null): obj is TaxLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTaxLine"')
      return TaxLine_possibleTypes.includes(obj.__typename)
    }
    


    const ConfigArg_possibleTypes: string[] = ['ConfigArg']
    export const isConfigArg = (obj?: { __typename?: any } | null): obj is ConfigArg => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isConfigArg"')
      return ConfigArg_possibleTypes.includes(obj.__typename)
    }
    


    const ConfigArgDefinition_possibleTypes: string[] = ['ConfigArgDefinition']
    export const isConfigArgDefinition = (obj?: { __typename?: any } | null): obj is ConfigArgDefinition => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isConfigArgDefinition"')
      return ConfigArgDefinition_possibleTypes.includes(obj.__typename)
    }
    


    const ConfigurableOperation_possibleTypes: string[] = ['ConfigurableOperation']
    export const isConfigurableOperation = (obj?: { __typename?: any } | null): obj is ConfigurableOperation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isConfigurableOperation"')
      return ConfigurableOperation_possibleTypes.includes(obj.__typename)
    }
    


    const ConfigurableOperationDefinition_possibleTypes: string[] = ['ConfigurableOperationDefinition']
    export const isConfigurableOperationDefinition = (obj?: { __typename?: any } | null): obj is ConfigurableOperationDefinition => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isConfigurableOperationDefinition"')
      return ConfigurableOperationDefinition_possibleTypes.includes(obj.__typename)
    }
    


    const DeletionResponse_possibleTypes: string[] = ['DeletionResponse']
    export const isDeletionResponse = (obj?: { __typename?: any } | null): obj is DeletionResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDeletionResponse"')
      return DeletionResponse_possibleTypes.includes(obj.__typename)
    }
    


    const Success_possibleTypes: string[] = ['Success']
    export const isSuccess = (obj?: { __typename?: any } | null): obj is Success => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSuccess"')
      return Success_possibleTypes.includes(obj.__typename)
    }
    


    const ShippingMethodQuote_possibleTypes: string[] = ['ShippingMethodQuote']
    export const isShippingMethodQuote = (obj?: { __typename?: any } | null): obj is ShippingMethodQuote => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShippingMethodQuote"')
      return ShippingMethodQuote_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethodQuote_possibleTypes: string[] = ['PaymentMethodQuote']
    export const isPaymentMethodQuote = (obj?: { __typename?: any } | null): obj is PaymentMethodQuote => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethodQuote"')
      return PaymentMethodQuote_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateOrderItemsResult_possibleTypes: string[] = ['Order','OrderModificationError','OrderLimitError','NegativeQuantityError','InsufficientStockError']
    export const isUpdateOrderItemsResult = (obj?: { __typename?: any } | null): obj is UpdateOrderItemsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateOrderItemsResult"')
      return UpdateOrderItemsResult_possibleTypes.includes(obj.__typename)
    }
    


    const RemoveOrderItemsResult_possibleTypes: string[] = ['Order','OrderModificationError']
    export const isRemoveOrderItemsResult = (obj?: { __typename?: any } | null): obj is RemoveOrderItemsResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRemoveOrderItemsResult"')
      return RemoveOrderItemsResult_possibleTypes.includes(obj.__typename)
    }
    


    const SetOrderShippingMethodResult_possibleTypes: string[] = ['Order','OrderModificationError','IneligibleShippingMethodError','NoActiveOrderError']
    export const isSetOrderShippingMethodResult = (obj?: { __typename?: any } | null): obj is SetOrderShippingMethodResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetOrderShippingMethodResult"')
      return SetOrderShippingMethodResult_possibleTypes.includes(obj.__typename)
    }
    


    const ApplyCouponCodeResult_possibleTypes: string[] = ['Order','CouponCodeExpiredError','CouponCodeInvalidError','CouponCodeLimitError']
    export const isApplyCouponCodeResult = (obj?: { __typename?: any } | null): obj is ApplyCouponCodeResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isApplyCouponCodeResult"')
      return ApplyCouponCodeResult_possibleTypes.includes(obj.__typename)
    }
    


    const CustomField_possibleTypes: string[] = ['StringCustomFieldConfig','LocaleStringCustomFieldConfig','IntCustomFieldConfig','FloatCustomFieldConfig','BooleanCustomFieldConfig','DateTimeCustomFieldConfig','RelationCustomFieldConfig','TextCustomFieldConfig','LocaleTextCustomFieldConfig']
    export const isCustomField = (obj?: { __typename?: any } | null): obj is CustomField => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCustomField"')
      return CustomField_possibleTypes.includes(obj.__typename)
    }
    


    const StringCustomFieldConfig_possibleTypes: string[] = ['StringCustomFieldConfig']
    export const isStringCustomFieldConfig = (obj?: { __typename?: any } | null): obj is StringCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStringCustomFieldConfig"')
      return StringCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const StringFieldOption_possibleTypes: string[] = ['StringFieldOption']
    export const isStringFieldOption = (obj?: { __typename?: any } | null): obj is StringFieldOption => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isStringFieldOption"')
      return StringFieldOption_possibleTypes.includes(obj.__typename)
    }
    


    const LocaleStringCustomFieldConfig_possibleTypes: string[] = ['LocaleStringCustomFieldConfig']
    export const isLocaleStringCustomFieldConfig = (obj?: { __typename?: any } | null): obj is LocaleStringCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocaleStringCustomFieldConfig"')
      return LocaleStringCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const IntCustomFieldConfig_possibleTypes: string[] = ['IntCustomFieldConfig']
    export const isIntCustomFieldConfig = (obj?: { __typename?: any } | null): obj is IntCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIntCustomFieldConfig"')
      return IntCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const FloatCustomFieldConfig_possibleTypes: string[] = ['FloatCustomFieldConfig']
    export const isFloatCustomFieldConfig = (obj?: { __typename?: any } | null): obj is FloatCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFloatCustomFieldConfig"')
      return FloatCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const BooleanCustomFieldConfig_possibleTypes: string[] = ['BooleanCustomFieldConfig']
    export const isBooleanCustomFieldConfig = (obj?: { __typename?: any } | null): obj is BooleanCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBooleanCustomFieldConfig"')
      return BooleanCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const DateTimeCustomFieldConfig_possibleTypes: string[] = ['DateTimeCustomFieldConfig']
    export const isDateTimeCustomFieldConfig = (obj?: { __typename?: any } | null): obj is DateTimeCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDateTimeCustomFieldConfig"')
      return DateTimeCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const RelationCustomFieldConfig_possibleTypes: string[] = ['RelationCustomFieldConfig']
    export const isRelationCustomFieldConfig = (obj?: { __typename?: any } | null): obj is RelationCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRelationCustomFieldConfig"')
      return RelationCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const TextCustomFieldConfig_possibleTypes: string[] = ['TextCustomFieldConfig']
    export const isTextCustomFieldConfig = (obj?: { __typename?: any } | null): obj is TextCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTextCustomFieldConfig"')
      return TextCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const LocaleTextCustomFieldConfig_possibleTypes: string[] = ['LocaleTextCustomFieldConfig']
    export const isLocaleTextCustomFieldConfig = (obj?: { __typename?: any } | null): obj is LocaleTextCustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocaleTextCustomFieldConfig"')
      return LocaleTextCustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const LocalizedString_possibleTypes: string[] = ['LocalizedString']
    export const isLocalizedString = (obj?: { __typename?: any } | null): obj is LocalizedString => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocalizedString"')
      return LocalizedString_possibleTypes.includes(obj.__typename)
    }
    


    const CustomFieldConfig_possibleTypes: string[] = ['StringCustomFieldConfig','LocaleStringCustomFieldConfig','IntCustomFieldConfig','FloatCustomFieldConfig','BooleanCustomFieldConfig','DateTimeCustomFieldConfig','RelationCustomFieldConfig','TextCustomFieldConfig','LocaleTextCustomFieldConfig']
    export const isCustomFieldConfig = (obj?: { __typename?: any } | null): obj is CustomFieldConfig => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCustomFieldConfig"')
      return CustomFieldConfig_possibleTypes.includes(obj.__typename)
    }
    


    const CustomerGroup_possibleTypes: string[] = ['CustomerGroup']
    export const isCustomerGroup = (obj?: { __typename?: any } | null): obj is CustomerGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCustomerGroup"')
      return CustomerGroup_possibleTypes.includes(obj.__typename)
    }
    


    const Customer_possibleTypes: string[] = ['Customer']
    export const isCustomer = (obj?: { __typename?: any } | null): obj is Customer => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCustomer"')
      return Customer_possibleTypes.includes(obj.__typename)
    }
    


    const CustomerList_possibleTypes: string[] = ['CustomerList']
    export const isCustomerList = (obj?: { __typename?: any } | null): obj is CustomerList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCustomerList"')
      return CustomerList_possibleTypes.includes(obj.__typename)
    }
    


    const FacetValue_possibleTypes: string[] = ['FacetValue']
    export const isFacetValue = (obj?: { __typename?: any } | null): obj is FacetValue => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetValue"')
      return FacetValue_possibleTypes.includes(obj.__typename)
    }
    


    const FacetValueTranslation_possibleTypes: string[] = ['FacetValueTranslation']
    export const isFacetValueTranslation = (obj?: { __typename?: any } | null): obj is FacetValueTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetValueTranslation"')
      return FacetValueTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const Facet_possibleTypes: string[] = ['Facet']
    export const isFacet = (obj?: { __typename?: any } | null): obj is Facet => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacet"')
      return Facet_possibleTypes.includes(obj.__typename)
    }
    


    const FacetTranslation_possibleTypes: string[] = ['FacetTranslation']
    export const isFacetTranslation = (obj?: { __typename?: any } | null): obj is FacetTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetTranslation"')
      return FacetTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const FacetList_possibleTypes: string[] = ['FacetList']
    export const isFacetList = (obj?: { __typename?: any } | null): obj is FacetList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetList"')
      return FacetList_possibleTypes.includes(obj.__typename)
    }
    


    const FacetValueList_possibleTypes: string[] = ['FacetValueList']
    export const isFacetValueList = (obj?: { __typename?: any } | null): obj is FacetValueList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetValueList"')
      return FacetValueList_possibleTypes.includes(obj.__typename)
    }
    


    const HistoryEntry_possibleTypes: string[] = ['HistoryEntry']
    export const isHistoryEntry = (obj?: { __typename?: any } | null): obj is HistoryEntry => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isHistoryEntry"')
      return HistoryEntry_possibleTypes.includes(obj.__typename)
    }
    


    const HistoryEntryList_possibleTypes: string[] = ['HistoryEntryList']
    export const isHistoryEntryList = (obj?: { __typename?: any } | null): obj is HistoryEntryList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isHistoryEntryList"')
      return HistoryEntryList_possibleTypes.includes(obj.__typename)
    }
    


    const Order_possibleTypes: string[] = ['Order']
    export const isOrder = (obj?: { __typename?: any } | null): obj is Order => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrder"')
      return Order_possibleTypes.includes(obj.__typename)
    }
    


    const OrderTaxSummary_possibleTypes: string[] = ['OrderTaxSummary']
    export const isOrderTaxSummary = (obj?: { __typename?: any } | null): obj is OrderTaxSummary => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderTaxSummary"')
      return OrderTaxSummary_possibleTypes.includes(obj.__typename)
    }
    


    const OrderAddress_possibleTypes: string[] = ['OrderAddress']
    export const isOrderAddress = (obj?: { __typename?: any } | null): obj is OrderAddress => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderAddress"')
      return OrderAddress_possibleTypes.includes(obj.__typename)
    }
    


    const OrderList_possibleTypes: string[] = ['OrderList']
    export const isOrderList = (obj?: { __typename?: any } | null): obj is OrderList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderList"')
      return OrderList_possibleTypes.includes(obj.__typename)
    }
    


    const ShippingLine_possibleTypes: string[] = ['ShippingLine']
    export const isShippingLine = (obj?: { __typename?: any } | null): obj is ShippingLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShippingLine"')
      return ShippingLine_possibleTypes.includes(obj.__typename)
    }
    


    const Discount_possibleTypes: string[] = ['Discount']
    export const isDiscount = (obj?: { __typename?: any } | null): obj is Discount => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDiscount"')
      return Discount_possibleTypes.includes(obj.__typename)
    }
    


    const OrderLine_possibleTypes: string[] = ['OrderLine']
    export const isOrderLine = (obj?: { __typename?: any } | null): obj is OrderLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderLine"')
      return OrderLine_possibleTypes.includes(obj.__typename)
    }
    


    const Payment_possibleTypes: string[] = ['Payment']
    export const isPayment = (obj?: { __typename?: any } | null): obj is Payment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPayment"')
      return Payment_possibleTypes.includes(obj.__typename)
    }
    


    const RefundLine_possibleTypes: string[] = ['RefundLine']
    export const isRefundLine = (obj?: { __typename?: any } | null): obj is RefundLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRefundLine"')
      return RefundLine_possibleTypes.includes(obj.__typename)
    }
    


    const Refund_possibleTypes: string[] = ['Refund']
    export const isRefund = (obj?: { __typename?: any } | null): obj is Refund => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRefund"')
      return Refund_possibleTypes.includes(obj.__typename)
    }
    


    const FulfillmentLine_possibleTypes: string[] = ['FulfillmentLine']
    export const isFulfillmentLine = (obj?: { __typename?: any } | null): obj is FulfillmentLine => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFulfillmentLine"')
      return FulfillmentLine_possibleTypes.includes(obj.__typename)
    }
    


    const Fulfillment_possibleTypes: string[] = ['Fulfillment']
    export const isFulfillment = (obj?: { __typename?: any } | null): obj is Fulfillment => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFulfillment"')
      return Fulfillment_possibleTypes.includes(obj.__typename)
    }
    


    const Surcharge_possibleTypes: string[] = ['Surcharge']
    export const isSurcharge = (obj?: { __typename?: any } | null): obj is Surcharge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSurcharge"')
      return Surcharge_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethod_possibleTypes: string[] = ['PaymentMethod']
    export const isPaymentMethod = (obj?: { __typename?: any } | null): obj is PaymentMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethod"')
      return PaymentMethod_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentMethodTranslation_possibleTypes: string[] = ['PaymentMethodTranslation']
    export const isPaymentMethodTranslation = (obj?: { __typename?: any } | null): obj is PaymentMethodTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentMethodTranslation"')
      return PaymentMethodTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const ProductOptionGroup_possibleTypes: string[] = ['ProductOptionGroup']
    export const isProductOptionGroup = (obj?: { __typename?: any } | null): obj is ProductOptionGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductOptionGroup"')
      return ProductOptionGroup_possibleTypes.includes(obj.__typename)
    }
    


    const ProductOptionGroupTranslation_possibleTypes: string[] = ['ProductOptionGroupTranslation']
    export const isProductOptionGroupTranslation = (obj?: { __typename?: any } | null): obj is ProductOptionGroupTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductOptionGroupTranslation"')
      return ProductOptionGroupTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const ProductOption_possibleTypes: string[] = ['ProductOption']
    export const isProductOption = (obj?: { __typename?: any } | null): obj is ProductOption => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductOption"')
      return ProductOption_possibleTypes.includes(obj.__typename)
    }
    


    const ProductOptionTranslation_possibleTypes: string[] = ['ProductOptionTranslation']
    export const isProductOptionTranslation = (obj?: { __typename?: any } | null): obj is ProductOptionTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductOptionTranslation"')
      return ProductOptionTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const SearchReindexResponse_possibleTypes: string[] = ['SearchReindexResponse']
    export const isSearchReindexResponse = (obj?: { __typename?: any } | null): obj is SearchReindexResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchReindexResponse"')
      return SearchReindexResponse_possibleTypes.includes(obj.__typename)
    }
    


    const SearchResponse_possibleTypes: string[] = ['SearchResponse']
    export const isSearchResponse = (obj?: { __typename?: any } | null): obj is SearchResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchResponse"')
      return SearchResponse_possibleTypes.includes(obj.__typename)
    }
    


    const FacetValueResult_possibleTypes: string[] = ['FacetValueResult']
    export const isFacetValueResult = (obj?: { __typename?: any } | null): obj is FacetValueResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isFacetValueResult"')
      return FacetValueResult_possibleTypes.includes(obj.__typename)
    }
    


    const CollectionResult_possibleTypes: string[] = ['CollectionResult']
    export const isCollectionResult = (obj?: { __typename?: any } | null): obj is CollectionResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCollectionResult"')
      return CollectionResult_possibleTypes.includes(obj.__typename)
    }
    


    const SearchResultAsset_possibleTypes: string[] = ['SearchResultAsset']
    export const isSearchResultAsset = (obj?: { __typename?: any } | null): obj is SearchResultAsset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchResultAsset"')
      return SearchResultAsset_possibleTypes.includes(obj.__typename)
    }
    


    const SearchResult_possibleTypes: string[] = ['SearchResult']
    export const isSearchResult = (obj?: { __typename?: any } | null): obj is SearchResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchResult"')
      return SearchResult_possibleTypes.includes(obj.__typename)
    }
    


    const SearchResultPrice_possibleTypes: string[] = ['PriceRange','SinglePrice']
    export const isSearchResultPrice = (obj?: { __typename?: any } | null): obj is SearchResultPrice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSearchResultPrice"')
      return SearchResultPrice_possibleTypes.includes(obj.__typename)
    }
    


    const SinglePrice_possibleTypes: string[] = ['SinglePrice']
    export const isSinglePrice = (obj?: { __typename?: any } | null): obj is SinglePrice => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSinglePrice"')
      return SinglePrice_possibleTypes.includes(obj.__typename)
    }
    


    const PriceRange_possibleTypes: string[] = ['PriceRange']
    export const isPriceRange = (obj?: { __typename?: any } | null): obj is PriceRange => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPriceRange"')
      return PriceRange_possibleTypes.includes(obj.__typename)
    }
    


    const Product_possibleTypes: string[] = ['Product']
    export const isProduct = (obj?: { __typename?: any } | null): obj is Product => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProduct"')
      return Product_possibleTypes.includes(obj.__typename)
    }
    


    const ProductTranslation_possibleTypes: string[] = ['ProductTranslation']
    export const isProductTranslation = (obj?: { __typename?: any } | null): obj is ProductTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductTranslation"')
      return ProductTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const ProductList_possibleTypes: string[] = ['ProductList']
    export const isProductList = (obj?: { __typename?: any } | null): obj is ProductList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductList"')
      return ProductList_possibleTypes.includes(obj.__typename)
    }
    


    const ProductVariantList_possibleTypes: string[] = ['ProductVariantList']
    export const isProductVariantList = (obj?: { __typename?: any } | null): obj is ProductVariantList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductVariantList"')
      return ProductVariantList_possibleTypes.includes(obj.__typename)
    }
    


    const ProductVariant_possibleTypes: string[] = ['ProductVariant']
    export const isProductVariant = (obj?: { __typename?: any } | null): obj is ProductVariant => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductVariant"')
      return ProductVariant_possibleTypes.includes(obj.__typename)
    }
    


    const ProductVariantTranslation_possibleTypes: string[] = ['ProductVariantTranslation']
    export const isProductVariantTranslation = (obj?: { __typename?: any } | null): obj is ProductVariantTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProductVariantTranslation"')
      return ProductVariantTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const Promotion_possibleTypes: string[] = ['Promotion']
    export const isPromotion = (obj?: { __typename?: any } | null): obj is Promotion => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPromotion"')
      return Promotion_possibleTypes.includes(obj.__typename)
    }
    


    const PromotionTranslation_possibleTypes: string[] = ['PromotionTranslation']
    export const isPromotionTranslation = (obj?: { __typename?: any } | null): obj is PromotionTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPromotionTranslation"')
      return PromotionTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const PromotionList_possibleTypes: string[] = ['PromotionList']
    export const isPromotionList = (obj?: { __typename?: any } | null): obj is PromotionList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPromotionList"')
      return PromotionList_possibleTypes.includes(obj.__typename)
    }
    


    const Region_possibleTypes: string[] = ['Country','Province']
    export const isRegion = (obj?: { __typename?: any } | null): obj is Region => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRegion"')
      return Region_possibleTypes.includes(obj.__typename)
    }
    


    const RegionTranslation_possibleTypes: string[] = ['RegionTranslation']
    export const isRegionTranslation = (obj?: { __typename?: any } | null): obj is RegionTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRegionTranslation"')
      return RegionTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const Country_possibleTypes: string[] = ['Country']
    export const isCountry = (obj?: { __typename?: any } | null): obj is Country => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCountry"')
      return Country_possibleTypes.includes(obj.__typename)
    }
    


    const CountryList_possibleTypes: string[] = ['CountryList']
    export const isCountryList = (obj?: { __typename?: any } | null): obj is CountryList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCountryList"')
      return CountryList_possibleTypes.includes(obj.__typename)
    }
    


    const Province_possibleTypes: string[] = ['Province']
    export const isProvince = (obj?: { __typename?: any } | null): obj is Province => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProvince"')
      return Province_possibleTypes.includes(obj.__typename)
    }
    


    const ProvinceList_possibleTypes: string[] = ['ProvinceList']
    export const isProvinceList = (obj?: { __typename?: any } | null): obj is ProvinceList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProvinceList"')
      return ProvinceList_possibleTypes.includes(obj.__typename)
    }
    


    const Role_possibleTypes: string[] = ['Role']
    export const isRole = (obj?: { __typename?: any } | null): obj is Role => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRole"')
      return Role_possibleTypes.includes(obj.__typename)
    }
    


    const RoleList_possibleTypes: string[] = ['RoleList']
    export const isRoleList = (obj?: { __typename?: any } | null): obj is RoleList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRoleList"')
      return RoleList_possibleTypes.includes(obj.__typename)
    }
    


    const Seller_possibleTypes: string[] = ['Seller']
    export const isSeller = (obj?: { __typename?: any } | null): obj is Seller => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSeller"')
      return Seller_possibleTypes.includes(obj.__typename)
    }
    


    const ShippingMethod_possibleTypes: string[] = ['ShippingMethod']
    export const isShippingMethod = (obj?: { __typename?: any } | null): obj is ShippingMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShippingMethod"')
      return ShippingMethod_possibleTypes.includes(obj.__typename)
    }
    


    const ShippingMethodTranslation_possibleTypes: string[] = ['ShippingMethodTranslation']
    export const isShippingMethodTranslation = (obj?: { __typename?: any } | null): obj is ShippingMethodTranslation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShippingMethodTranslation"')
      return ShippingMethodTranslation_possibleTypes.includes(obj.__typename)
    }
    


    const ShippingMethodList_possibleTypes: string[] = ['ShippingMethodList']
    export const isShippingMethodList = (obj?: { __typename?: any } | null): obj is ShippingMethodList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShippingMethodList"')
      return ShippingMethodList_possibleTypes.includes(obj.__typename)
    }
    


    const Tag_possibleTypes: string[] = ['Tag']
    export const isTag = (obj?: { __typename?: any } | null): obj is Tag => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTag"')
      return Tag_possibleTypes.includes(obj.__typename)
    }
    


    const TagList_possibleTypes: string[] = ['TagList']
    export const isTagList = (obj?: { __typename?: any } | null): obj is TagList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTagList"')
      return TagList_possibleTypes.includes(obj.__typename)
    }
    


    const TaxCategory_possibleTypes: string[] = ['TaxCategory']
    export const isTaxCategory = (obj?: { __typename?: any } | null): obj is TaxCategory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTaxCategory"')
      return TaxCategory_possibleTypes.includes(obj.__typename)
    }
    


    const TaxRate_possibleTypes: string[] = ['TaxRate']
    export const isTaxRate = (obj?: { __typename?: any } | null): obj is TaxRate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTaxRate"')
      return TaxRate_possibleTypes.includes(obj.__typename)
    }
    


    const TaxRateList_possibleTypes: string[] = ['TaxRateList']
    export const isTaxRateList = (obj?: { __typename?: any } | null): obj is TaxRateList => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTaxRateList"')
      return TaxRateList_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    


    const AuthenticationMethod_possibleTypes: string[] = ['AuthenticationMethod']
    export const isAuthenticationMethod = (obj?: { __typename?: any } | null): obj is AuthenticationMethod => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuthenticationMethod"')
      return AuthenticationMethod_possibleTypes.includes(obj.__typename)
    }
    


    const Zone_possibleTypes: string[] = ['Zone']
    export const isZone = (obj?: { __typename?: any } | null): obj is Zone => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isZone"')
      return Zone_possibleTypes.includes(obj.__typename)
    }
    


    const OrderPaymentStateError_possibleTypes: string[] = ['OrderPaymentStateError']
    export const isOrderPaymentStateError = (obj?: { __typename?: any } | null): obj is OrderPaymentStateError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrderPaymentStateError"')
      return OrderPaymentStateError_possibleTypes.includes(obj.__typename)
    }
    


    const IneligiblePaymentMethodError_possibleTypes: string[] = ['IneligiblePaymentMethodError']
    export const isIneligiblePaymentMethodError = (obj?: { __typename?: any } | null): obj is IneligiblePaymentMethodError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIneligiblePaymentMethodError"')
      return IneligiblePaymentMethodError_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentFailedError_possibleTypes: string[] = ['PaymentFailedError']
    export const isPaymentFailedError = (obj?: { __typename?: any } | null): obj is PaymentFailedError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentFailedError"')
      return PaymentFailedError_possibleTypes.includes(obj.__typename)
    }
    


    const PaymentDeclinedError_possibleTypes: string[] = ['PaymentDeclinedError']
    export const isPaymentDeclinedError = (obj?: { __typename?: any } | null): obj is PaymentDeclinedError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaymentDeclinedError"')
      return PaymentDeclinedError_possibleTypes.includes(obj.__typename)
    }
    


    const AlreadyLoggedInError_possibleTypes: string[] = ['AlreadyLoggedInError']
    export const isAlreadyLoggedInError = (obj?: { __typename?: any } | null): obj is AlreadyLoggedInError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAlreadyLoggedInError"')
      return AlreadyLoggedInError_possibleTypes.includes(obj.__typename)
    }
    


    const MissingPasswordError_possibleTypes: string[] = ['MissingPasswordError']
    export const isMissingPasswordError = (obj?: { __typename?: any } | null): obj is MissingPasswordError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMissingPasswordError"')
      return MissingPasswordError_possibleTypes.includes(obj.__typename)
    }
    


    const PasswordValidationError_possibleTypes: string[] = ['PasswordValidationError']
    export const isPasswordValidationError = (obj?: { __typename?: any } | null): obj is PasswordValidationError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPasswordValidationError"')
      return PasswordValidationError_possibleTypes.includes(obj.__typename)
    }
    


    const PasswordAlreadySetError_possibleTypes: string[] = ['PasswordAlreadySetError']
    export const isPasswordAlreadySetError = (obj?: { __typename?: any } | null): obj is PasswordAlreadySetError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPasswordAlreadySetError"')
      return PasswordAlreadySetError_possibleTypes.includes(obj.__typename)
    }
    


    const VerificationTokenInvalidError_possibleTypes: string[] = ['VerificationTokenInvalidError']
    export const isVerificationTokenInvalidError = (obj?: { __typename?: any } | null): obj is VerificationTokenInvalidError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVerificationTokenInvalidError"')
      return VerificationTokenInvalidError_possibleTypes.includes(obj.__typename)
    }
    


    const VerificationTokenExpiredError_possibleTypes: string[] = ['VerificationTokenExpiredError']
    export const isVerificationTokenExpiredError = (obj?: { __typename?: any } | null): obj is VerificationTokenExpiredError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVerificationTokenExpiredError"')
      return VerificationTokenExpiredError_possibleTypes.includes(obj.__typename)
    }
    


    const IdentifierChangeTokenInvalidError_possibleTypes: string[] = ['IdentifierChangeTokenInvalidError']
    export const isIdentifierChangeTokenInvalidError = (obj?: { __typename?: any } | null): obj is IdentifierChangeTokenInvalidError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIdentifierChangeTokenInvalidError"')
      return IdentifierChangeTokenInvalidError_possibleTypes.includes(obj.__typename)
    }
    


    const IdentifierChangeTokenExpiredError_possibleTypes: string[] = ['IdentifierChangeTokenExpiredError']
    export const isIdentifierChangeTokenExpiredError = (obj?: { __typename?: any } | null): obj is IdentifierChangeTokenExpiredError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isIdentifierChangeTokenExpiredError"')
      return IdentifierChangeTokenExpiredError_possibleTypes.includes(obj.__typename)
    }
    


    const PasswordResetTokenInvalidError_possibleTypes: string[] = ['PasswordResetTokenInvalidError']
    export const isPasswordResetTokenInvalidError = (obj?: { __typename?: any } | null): obj is PasswordResetTokenInvalidError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPasswordResetTokenInvalidError"')
      return PasswordResetTokenInvalidError_possibleTypes.includes(obj.__typename)
    }
    


    const PasswordResetTokenExpiredError_possibleTypes: string[] = ['PasswordResetTokenExpiredError']
    export const isPasswordResetTokenExpiredError = (obj?: { __typename?: any } | null): obj is PasswordResetTokenExpiredError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPasswordResetTokenExpiredError"')
      return PasswordResetTokenExpiredError_possibleTypes.includes(obj.__typename)
    }
    


    const NotVerifiedError_possibleTypes: string[] = ['NotVerifiedError']
    export const isNotVerifiedError = (obj?: { __typename?: any } | null): obj is NotVerifiedError => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNotVerifiedError"')
      return NotVerifiedError_possibleTypes.includes(obj.__typename)
    }
    


    const AddPaymentToOrderResult_possibleTypes: string[] = ['Order','OrderPaymentStateError','IneligiblePaymentMethodError','PaymentFailedError','PaymentDeclinedError','OrderStateTransitionError','NoActiveOrderError']
    export const isAddPaymentToOrderResult = (obj?: { __typename?: any } | null): obj is AddPaymentToOrderResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAddPaymentToOrderResult"')
      return AddPaymentToOrderResult_possibleTypes.includes(obj.__typename)
    }
    


    const TransitionOrderToStateResult_possibleTypes: string[] = ['Order','OrderStateTransitionError']
    export const isTransitionOrderToStateResult = (obj?: { __typename?: any } | null): obj is TransitionOrderToStateResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTransitionOrderToStateResult"')
      return TransitionOrderToStateResult_possibleTypes.includes(obj.__typename)
    }
    


    const SetCustomerForOrderResult_possibleTypes: string[] = ['Order','AlreadyLoggedInError','EmailAddressConflictError','NoActiveOrderError','GuestCheckoutError']
    export const isSetCustomerForOrderResult = (obj?: { __typename?: any } | null): obj is SetCustomerForOrderResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSetCustomerForOrderResult"')
      return SetCustomerForOrderResult_possibleTypes.includes(obj.__typename)
    }
    


    const RegisterCustomerAccountResult_possibleTypes: string[] = ['Success','MissingPasswordError','PasswordValidationError','NativeAuthStrategyError']
    export const isRegisterCustomerAccountResult = (obj?: { __typename?: any } | null): obj is RegisterCustomerAccountResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRegisterCustomerAccountResult"')
      return RegisterCustomerAccountResult_possibleTypes.includes(obj.__typename)
    }
    


    const RefreshCustomerVerificationResult_possibleTypes: string[] = ['Success','NativeAuthStrategyError']
    export const isRefreshCustomerVerificationResult = (obj?: { __typename?: any } | null): obj is RefreshCustomerVerificationResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRefreshCustomerVerificationResult"')
      return RefreshCustomerVerificationResult_possibleTypes.includes(obj.__typename)
    }
    


    const VerifyCustomerAccountResult_possibleTypes: string[] = ['CurrentUser','VerificationTokenInvalidError','VerificationTokenExpiredError','MissingPasswordError','PasswordValidationError','PasswordAlreadySetError','NativeAuthStrategyError']
    export const isVerifyCustomerAccountResult = (obj?: { __typename?: any } | null): obj is VerifyCustomerAccountResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVerifyCustomerAccountResult"')
      return VerifyCustomerAccountResult_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCustomerPasswordResult_possibleTypes: string[] = ['Success','InvalidCredentialsError','PasswordValidationError','NativeAuthStrategyError']
    export const isUpdateCustomerPasswordResult = (obj?: { __typename?: any } | null): obj is UpdateCustomerPasswordResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCustomerPasswordResult"')
      return UpdateCustomerPasswordResult_possibleTypes.includes(obj.__typename)
    }
    


    const RequestUpdateCustomerEmailAddressResult_possibleTypes: string[] = ['Success','InvalidCredentialsError','EmailAddressConflictError','NativeAuthStrategyError']
    export const isRequestUpdateCustomerEmailAddressResult = (obj?: { __typename?: any } | null): obj is RequestUpdateCustomerEmailAddressResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRequestUpdateCustomerEmailAddressResult"')
      return RequestUpdateCustomerEmailAddressResult_possibleTypes.includes(obj.__typename)
    }
    


    const UpdateCustomerEmailAddressResult_possibleTypes: string[] = ['Success','IdentifierChangeTokenInvalidError','IdentifierChangeTokenExpiredError','NativeAuthStrategyError']
    export const isUpdateCustomerEmailAddressResult = (obj?: { __typename?: any } | null): obj is UpdateCustomerEmailAddressResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUpdateCustomerEmailAddressResult"')
      return UpdateCustomerEmailAddressResult_possibleTypes.includes(obj.__typename)
    }
    


    const RequestPasswordResetResult_possibleTypes: string[] = ['Success','NativeAuthStrategyError']
    export const isRequestPasswordResetResult = (obj?: { __typename?: any } | null): obj is RequestPasswordResetResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRequestPasswordResetResult"')
      return RequestPasswordResetResult_possibleTypes.includes(obj.__typename)
    }
    


    const ResetPasswordResult_possibleTypes: string[] = ['CurrentUser','PasswordResetTokenInvalidError','PasswordResetTokenExpiredError','PasswordValidationError','NativeAuthStrategyError','NotVerifiedError']
    export const isResetPasswordResult = (obj?: { __typename?: any } | null): obj is ResetPasswordResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isResetPasswordResult"')
      return ResetPasswordResult_possibleTypes.includes(obj.__typename)
    }
    


    const NativeAuthenticationResult_possibleTypes: string[] = ['CurrentUser','InvalidCredentialsError','NotVerifiedError','NativeAuthStrategyError']
    export const isNativeAuthenticationResult = (obj?: { __typename?: any } | null): obj is NativeAuthenticationResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isNativeAuthenticationResult"')
      return NativeAuthenticationResult_possibleTypes.includes(obj.__typename)
    }
    


    const AuthenticationResult_possibleTypes: string[] = ['CurrentUser','InvalidCredentialsError','NotVerifiedError']
    export const isAuthenticationResult = (obj?: { __typename?: any } | null): obj is AuthenticationResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuthenticationResult"')
      return AuthenticationResult_possibleTypes.includes(obj.__typename)
    }
    


    const ActiveOrderResult_possibleTypes: string[] = ['Order','NoActiveOrderError']
    export const isActiveOrderResult = (obj?: { __typename?: any } | null): obj is ActiveOrderResult => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isActiveOrderResult"')
      return ActiveOrderResult_possibleTypes.includes(obj.__typename)
    }
    

export const enumAssetType = {
   IMAGE: 'IMAGE' as const,
   VIDEO: 'VIDEO' as const,
   BINARY: 'BINARY' as const
}

export const enumGlobalFlag = {
   TRUE: 'TRUE' as const,
   FALSE: 'FALSE' as const,
   INHERIT: 'INHERIT' as const
}

export const enumAdjustmentType = {
   PROMOTION: 'PROMOTION' as const,
   DISTRIBUTED_ORDER_PROMOTION: 'DISTRIBUTED_ORDER_PROMOTION' as const,
   OTHER: 'OTHER' as const
}

export const enumDeletionResult = {
   DELETED: 'DELETED' as const,
   NOT_DELETED: 'NOT_DELETED' as const
}

export const enumPermission = {
   Authenticated: 'Authenticated' as const,
   SuperAdmin: 'SuperAdmin' as const,
   Owner: 'Owner' as const,
   Public: 'Public' as const,
   UpdateGlobalSettings: 'UpdateGlobalSettings' as const,
   CreateCatalog: 'CreateCatalog' as const,
   ReadCatalog: 'ReadCatalog' as const,
   UpdateCatalog: 'UpdateCatalog' as const,
   DeleteCatalog: 'DeleteCatalog' as const,
   CreateSettings: 'CreateSettings' as const,
   ReadSettings: 'ReadSettings' as const,
   UpdateSettings: 'UpdateSettings' as const,
   DeleteSettings: 'DeleteSettings' as const,
   CreateAdministrator: 'CreateAdministrator' as const,
   ReadAdministrator: 'ReadAdministrator' as const,
   UpdateAdministrator: 'UpdateAdministrator' as const,
   DeleteAdministrator: 'DeleteAdministrator' as const,
   CreateAsset: 'CreateAsset' as const,
   ReadAsset: 'ReadAsset' as const,
   UpdateAsset: 'UpdateAsset' as const,
   DeleteAsset: 'DeleteAsset' as const,
   CreateChannel: 'CreateChannel' as const,
   ReadChannel: 'ReadChannel' as const,
   UpdateChannel: 'UpdateChannel' as const,
   DeleteChannel: 'DeleteChannel' as const,
   CreateCollection: 'CreateCollection' as const,
   ReadCollection: 'ReadCollection' as const,
   UpdateCollection: 'UpdateCollection' as const,
   DeleteCollection: 'DeleteCollection' as const,
   CreateCountry: 'CreateCountry' as const,
   ReadCountry: 'ReadCountry' as const,
   UpdateCountry: 'UpdateCountry' as const,
   DeleteCountry: 'DeleteCountry' as const,
   CreateCustomer: 'CreateCustomer' as const,
   ReadCustomer: 'ReadCustomer' as const,
   UpdateCustomer: 'UpdateCustomer' as const,
   DeleteCustomer: 'DeleteCustomer' as const,
   CreateCustomerGroup: 'CreateCustomerGroup' as const,
   ReadCustomerGroup: 'ReadCustomerGroup' as const,
   UpdateCustomerGroup: 'UpdateCustomerGroup' as const,
   DeleteCustomerGroup: 'DeleteCustomerGroup' as const,
   CreateFacet: 'CreateFacet' as const,
   ReadFacet: 'ReadFacet' as const,
   UpdateFacet: 'UpdateFacet' as const,
   DeleteFacet: 'DeleteFacet' as const,
   CreateOrder: 'CreateOrder' as const,
   ReadOrder: 'ReadOrder' as const,
   UpdateOrder: 'UpdateOrder' as const,
   DeleteOrder: 'DeleteOrder' as const,
   CreatePaymentMethod: 'CreatePaymentMethod' as const,
   ReadPaymentMethod: 'ReadPaymentMethod' as const,
   UpdatePaymentMethod: 'UpdatePaymentMethod' as const,
   DeletePaymentMethod: 'DeletePaymentMethod' as const,
   CreateProduct: 'CreateProduct' as const,
   ReadProduct: 'ReadProduct' as const,
   UpdateProduct: 'UpdateProduct' as const,
   DeleteProduct: 'DeleteProduct' as const,
   CreatePromotion: 'CreatePromotion' as const,
   ReadPromotion: 'ReadPromotion' as const,
   UpdatePromotion: 'UpdatePromotion' as const,
   DeletePromotion: 'DeletePromotion' as const,
   CreateShippingMethod: 'CreateShippingMethod' as const,
   ReadShippingMethod: 'ReadShippingMethod' as const,
   UpdateShippingMethod: 'UpdateShippingMethod' as const,
   DeleteShippingMethod: 'DeleteShippingMethod' as const,
   CreateTag: 'CreateTag' as const,
   ReadTag: 'ReadTag' as const,
   UpdateTag: 'UpdateTag' as const,
   DeleteTag: 'DeleteTag' as const,
   CreateTaxCategory: 'CreateTaxCategory' as const,
   ReadTaxCategory: 'ReadTaxCategory' as const,
   UpdateTaxCategory: 'UpdateTaxCategory' as const,
   DeleteTaxCategory: 'DeleteTaxCategory' as const,
   CreateTaxRate: 'CreateTaxRate' as const,
   ReadTaxRate: 'ReadTaxRate' as const,
   UpdateTaxRate: 'UpdateTaxRate' as const,
   DeleteTaxRate: 'DeleteTaxRate' as const,
   CreateSeller: 'CreateSeller' as const,
   ReadSeller: 'ReadSeller' as const,
   UpdateSeller: 'UpdateSeller' as const,
   DeleteSeller: 'DeleteSeller' as const,
   CreateStockLocation: 'CreateStockLocation' as const,
   ReadStockLocation: 'ReadStockLocation' as const,
   UpdateStockLocation: 'UpdateStockLocation' as const,
   DeleteStockLocation: 'DeleteStockLocation' as const,
   CreateSystem: 'CreateSystem' as const,
   ReadSystem: 'ReadSystem' as const,
   UpdateSystem: 'UpdateSystem' as const,
   DeleteSystem: 'DeleteSystem' as const,
   CreateZone: 'CreateZone' as const,
   ReadZone: 'ReadZone' as const,
   UpdateZone: 'UpdateZone' as const,
   DeleteZone: 'DeleteZone' as const
}

export const enumSortOrder = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumErrorCode = {
   UNKNOWN_ERROR: 'UNKNOWN_ERROR' as const,
   NATIVE_AUTH_STRATEGY_ERROR: 'NATIVE_AUTH_STRATEGY_ERROR' as const,
   INVALID_CREDENTIALS_ERROR: 'INVALID_CREDENTIALS_ERROR' as const,
   ORDER_STATE_TRANSITION_ERROR: 'ORDER_STATE_TRANSITION_ERROR' as const,
   EMAIL_ADDRESS_CONFLICT_ERROR: 'EMAIL_ADDRESS_CONFLICT_ERROR' as const,
   GUEST_CHECKOUT_ERROR: 'GUEST_CHECKOUT_ERROR' as const,
   ORDER_LIMIT_ERROR: 'ORDER_LIMIT_ERROR' as const,
   NEGATIVE_QUANTITY_ERROR: 'NEGATIVE_QUANTITY_ERROR' as const,
   INSUFFICIENT_STOCK_ERROR: 'INSUFFICIENT_STOCK_ERROR' as const,
   COUPON_CODE_INVALID_ERROR: 'COUPON_CODE_INVALID_ERROR' as const,
   COUPON_CODE_EXPIRED_ERROR: 'COUPON_CODE_EXPIRED_ERROR' as const,
   COUPON_CODE_LIMIT_ERROR: 'COUPON_CODE_LIMIT_ERROR' as const,
   ORDER_MODIFICATION_ERROR: 'ORDER_MODIFICATION_ERROR' as const,
   INELIGIBLE_SHIPPING_METHOD_ERROR: 'INELIGIBLE_SHIPPING_METHOD_ERROR' as const,
   NO_ACTIVE_ORDER_ERROR: 'NO_ACTIVE_ORDER_ERROR' as const,
   ORDER_PAYMENT_STATE_ERROR: 'ORDER_PAYMENT_STATE_ERROR' as const,
   INELIGIBLE_PAYMENT_METHOD_ERROR: 'INELIGIBLE_PAYMENT_METHOD_ERROR' as const,
   PAYMENT_FAILED_ERROR: 'PAYMENT_FAILED_ERROR' as const,
   PAYMENT_DECLINED_ERROR: 'PAYMENT_DECLINED_ERROR' as const,
   ALREADY_LOGGED_IN_ERROR: 'ALREADY_LOGGED_IN_ERROR' as const,
   MISSING_PASSWORD_ERROR: 'MISSING_PASSWORD_ERROR' as const,
   PASSWORD_VALIDATION_ERROR: 'PASSWORD_VALIDATION_ERROR' as const,
   PASSWORD_ALREADY_SET_ERROR: 'PASSWORD_ALREADY_SET_ERROR' as const,
   VERIFICATION_TOKEN_INVALID_ERROR: 'VERIFICATION_TOKEN_INVALID_ERROR' as const,
   VERIFICATION_TOKEN_EXPIRED_ERROR: 'VERIFICATION_TOKEN_EXPIRED_ERROR' as const,
   IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR: 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR' as const,
   IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR: 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR' as const,
   PASSWORD_RESET_TOKEN_INVALID_ERROR: 'PASSWORD_RESET_TOKEN_INVALID_ERROR' as const,
   PASSWORD_RESET_TOKEN_EXPIRED_ERROR: 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR' as const,
   NOT_VERIFIED_ERROR: 'NOT_VERIFIED_ERROR' as const
}

export const enumLogicalOperator = {
   AND: 'AND' as const,
   OR: 'OR' as const
}

export const enumCurrencyCode = {
   AED: 'AED' as const,
   AFN: 'AFN' as const,
   ALL: 'ALL' as const,
   AMD: 'AMD' as const,
   ANG: 'ANG' as const,
   AOA: 'AOA' as const,
   ARS: 'ARS' as const,
   AUD: 'AUD' as const,
   AWG: 'AWG' as const,
   AZN: 'AZN' as const,
   BAM: 'BAM' as const,
   BBD: 'BBD' as const,
   BDT: 'BDT' as const,
   BGN: 'BGN' as const,
   BHD: 'BHD' as const,
   BIF: 'BIF' as const,
   BMD: 'BMD' as const,
   BND: 'BND' as const,
   BOB: 'BOB' as const,
   BRL: 'BRL' as const,
   BSD: 'BSD' as const,
   BTN: 'BTN' as const,
   BWP: 'BWP' as const,
   BYN: 'BYN' as const,
   BZD: 'BZD' as const,
   CAD: 'CAD' as const,
   CDF: 'CDF' as const,
   CHF: 'CHF' as const,
   CLP: 'CLP' as const,
   CNY: 'CNY' as const,
   COP: 'COP' as const,
   CRC: 'CRC' as const,
   CUC: 'CUC' as const,
   CUP: 'CUP' as const,
   CVE: 'CVE' as const,
   CZK: 'CZK' as const,
   DJF: 'DJF' as const,
   DKK: 'DKK' as const,
   DOP: 'DOP' as const,
   DZD: 'DZD' as const,
   EGP: 'EGP' as const,
   ERN: 'ERN' as const,
   ETB: 'ETB' as const,
   EUR: 'EUR' as const,
   FJD: 'FJD' as const,
   FKP: 'FKP' as const,
   GBP: 'GBP' as const,
   GEL: 'GEL' as const,
   GHS: 'GHS' as const,
   GIP: 'GIP' as const,
   GMD: 'GMD' as const,
   GNF: 'GNF' as const,
   GTQ: 'GTQ' as const,
   GYD: 'GYD' as const,
   HKD: 'HKD' as const,
   HNL: 'HNL' as const,
   HRK: 'HRK' as const,
   HTG: 'HTG' as const,
   HUF: 'HUF' as const,
   IDR: 'IDR' as const,
   ILS: 'ILS' as const,
   INR: 'INR' as const,
   IQD: 'IQD' as const,
   IRR: 'IRR' as const,
   ISK: 'ISK' as const,
   JMD: 'JMD' as const,
   JOD: 'JOD' as const,
   JPY: 'JPY' as const,
   KES: 'KES' as const,
   KGS: 'KGS' as const,
   KHR: 'KHR' as const,
   KMF: 'KMF' as const,
   KPW: 'KPW' as const,
   KRW: 'KRW' as const,
   KWD: 'KWD' as const,
   KYD: 'KYD' as const,
   KZT: 'KZT' as const,
   LAK: 'LAK' as const,
   LBP: 'LBP' as const,
   LKR: 'LKR' as const,
   LRD: 'LRD' as const,
   LSL: 'LSL' as const,
   LYD: 'LYD' as const,
   MAD: 'MAD' as const,
   MDL: 'MDL' as const,
   MGA: 'MGA' as const,
   MKD: 'MKD' as const,
   MMK: 'MMK' as const,
   MNT: 'MNT' as const,
   MOP: 'MOP' as const,
   MRU: 'MRU' as const,
   MUR: 'MUR' as const,
   MVR: 'MVR' as const,
   MWK: 'MWK' as const,
   MXN: 'MXN' as const,
   MYR: 'MYR' as const,
   MZN: 'MZN' as const,
   NAD: 'NAD' as const,
   NGN: 'NGN' as const,
   NIO: 'NIO' as const,
   NOK: 'NOK' as const,
   NPR: 'NPR' as const,
   NZD: 'NZD' as const,
   OMR: 'OMR' as const,
   PAB: 'PAB' as const,
   PEN: 'PEN' as const,
   PGK: 'PGK' as const,
   PHP: 'PHP' as const,
   PKR: 'PKR' as const,
   PLN: 'PLN' as const,
   PYG: 'PYG' as const,
   QAR: 'QAR' as const,
   RON: 'RON' as const,
   RSD: 'RSD' as const,
   RUB: 'RUB' as const,
   RWF: 'RWF' as const,
   SAR: 'SAR' as const,
   SBD: 'SBD' as const,
   SCR: 'SCR' as const,
   SDG: 'SDG' as const,
   SEK: 'SEK' as const,
   SGD: 'SGD' as const,
   SHP: 'SHP' as const,
   SLL: 'SLL' as const,
   SOS: 'SOS' as const,
   SRD: 'SRD' as const,
   SSP: 'SSP' as const,
   STN: 'STN' as const,
   SVC: 'SVC' as const,
   SYP: 'SYP' as const,
   SZL: 'SZL' as const,
   THB: 'THB' as const,
   TJS: 'TJS' as const,
   TMT: 'TMT' as const,
   TND: 'TND' as const,
   TOP: 'TOP' as const,
   TRY: 'TRY' as const,
   TTD: 'TTD' as const,
   TWD: 'TWD' as const,
   TZS: 'TZS' as const,
   UAH: 'UAH' as const,
   UGX: 'UGX' as const,
   USD: 'USD' as const,
   UYU: 'UYU' as const,
   UZS: 'UZS' as const,
   VES: 'VES' as const,
   VND: 'VND' as const,
   VUV: 'VUV' as const,
   WST: 'WST' as const,
   XAF: 'XAF' as const,
   XCD: 'XCD' as const,
   XOF: 'XOF' as const,
   XPF: 'XPF' as const,
   YER: 'YER' as const,
   ZAR: 'ZAR' as const,
   ZMW: 'ZMW' as const,
   ZWL: 'ZWL' as const
}

export const enumHistoryEntryType = {
   CUSTOMER_REGISTERED: 'CUSTOMER_REGISTERED' as const,
   CUSTOMER_VERIFIED: 'CUSTOMER_VERIFIED' as const,
   CUSTOMER_DETAIL_UPDATED: 'CUSTOMER_DETAIL_UPDATED' as const,
   CUSTOMER_ADDED_TO_GROUP: 'CUSTOMER_ADDED_TO_GROUP' as const,
   CUSTOMER_REMOVED_FROM_GROUP: 'CUSTOMER_REMOVED_FROM_GROUP' as const,
   CUSTOMER_ADDRESS_CREATED: 'CUSTOMER_ADDRESS_CREATED' as const,
   CUSTOMER_ADDRESS_UPDATED: 'CUSTOMER_ADDRESS_UPDATED' as const,
   CUSTOMER_ADDRESS_DELETED: 'CUSTOMER_ADDRESS_DELETED' as const,
   CUSTOMER_PASSWORD_UPDATED: 'CUSTOMER_PASSWORD_UPDATED' as const,
   CUSTOMER_PASSWORD_RESET_REQUESTED: 'CUSTOMER_PASSWORD_RESET_REQUESTED' as const,
   CUSTOMER_PASSWORD_RESET_VERIFIED: 'CUSTOMER_PASSWORD_RESET_VERIFIED' as const,
   CUSTOMER_EMAIL_UPDATE_REQUESTED: 'CUSTOMER_EMAIL_UPDATE_REQUESTED' as const,
   CUSTOMER_EMAIL_UPDATE_VERIFIED: 'CUSTOMER_EMAIL_UPDATE_VERIFIED' as const,
   CUSTOMER_NOTE: 'CUSTOMER_NOTE' as const,
   ORDER_STATE_TRANSITION: 'ORDER_STATE_TRANSITION' as const,
   ORDER_PAYMENT_TRANSITION: 'ORDER_PAYMENT_TRANSITION' as const,
   ORDER_FULFILLMENT: 'ORDER_FULFILLMENT' as const,
   ORDER_CANCELLATION: 'ORDER_CANCELLATION' as const,
   ORDER_REFUND_TRANSITION: 'ORDER_REFUND_TRANSITION' as const,
   ORDER_FULFILLMENT_TRANSITION: 'ORDER_FULFILLMENT_TRANSITION' as const,
   ORDER_NOTE: 'ORDER_NOTE' as const,
   ORDER_COUPON_APPLIED: 'ORDER_COUPON_APPLIED' as const,
   ORDER_COUPON_REMOVED: 'ORDER_COUPON_REMOVED' as const,
   ORDER_MODIFIED: 'ORDER_MODIFIED' as const,
   ORDER_CUSTOMER_UPDATED: 'ORDER_CUSTOMER_UPDATED' as const
}

export const enumLanguageCode = {
   af: 'af' as const,
   ak: 'ak' as const,
   sq: 'sq' as const,
   am: 'am' as const,
   ar: 'ar' as const,
   hy: 'hy' as const,
   as: 'as' as const,
   az: 'az' as const,
   bm: 'bm' as const,
   bn: 'bn' as const,
   eu: 'eu' as const,
   be: 'be' as const,
   bs: 'bs' as const,
   br: 'br' as const,
   bg: 'bg' as const,
   my: 'my' as const,
   ca: 'ca' as const,
   ce: 'ce' as const,
   zh: 'zh' as const,
   zh_Hans: 'zh_Hans' as const,
   zh_Hant: 'zh_Hant' as const,
   cu: 'cu' as const,
   kw: 'kw' as const,
   co: 'co' as const,
   hr: 'hr' as const,
   cs: 'cs' as const,
   da: 'da' as const,
   nl: 'nl' as const,
   nl_BE: 'nl_BE' as const,
   dz: 'dz' as const,
   en: 'en' as const,
   en_AU: 'en_AU' as const,
   en_CA: 'en_CA' as const,
   en_GB: 'en_GB' as const,
   en_US: 'en_US' as const,
   eo: 'eo' as const,
   et: 'et' as const,
   ee: 'ee' as const,
   fo: 'fo' as const,
   fi: 'fi' as const,
   fr: 'fr' as const,
   fr_CA: 'fr_CA' as const,
   fr_CH: 'fr_CH' as const,
   ff: 'ff' as const,
   gl: 'gl' as const,
   lg: 'lg' as const,
   ka: 'ka' as const,
   de: 'de' as const,
   de_AT: 'de_AT' as const,
   de_CH: 'de_CH' as const,
   el: 'el' as const,
   gu: 'gu' as const,
   ht: 'ht' as const,
   ha: 'ha' as const,
   he: 'he' as const,
   hi: 'hi' as const,
   hu: 'hu' as const,
   is: 'is' as const,
   ig: 'ig' as const,
   id: 'id' as const,
   ia: 'ia' as const,
   ga: 'ga' as const,
   it: 'it' as const,
   ja: 'ja' as const,
   jv: 'jv' as const,
   kl: 'kl' as const,
   kn: 'kn' as const,
   ks: 'ks' as const,
   kk: 'kk' as const,
   km: 'km' as const,
   ki: 'ki' as const,
   rw: 'rw' as const,
   ko: 'ko' as const,
   ku: 'ku' as const,
   ky: 'ky' as const,
   lo: 'lo' as const,
   la: 'la' as const,
   lv: 'lv' as const,
   ln: 'ln' as const,
   lt: 'lt' as const,
   lu: 'lu' as const,
   lb: 'lb' as const,
   mk: 'mk' as const,
   mg: 'mg' as const,
   ms: 'ms' as const,
   ml: 'ml' as const,
   mt: 'mt' as const,
   gv: 'gv' as const,
   mi: 'mi' as const,
   mr: 'mr' as const,
   mn: 'mn' as const,
   ne: 'ne' as const,
   nd: 'nd' as const,
   se: 'se' as const,
   nb: 'nb' as const,
   nn: 'nn' as const,
   ny: 'ny' as const,
   or: 'or' as const,
   om: 'om' as const,
   os: 'os' as const,
   ps: 'ps' as const,
   fa: 'fa' as const,
   fa_AF: 'fa_AF' as const,
   pl: 'pl' as const,
   pt: 'pt' as const,
   pt_BR: 'pt_BR' as const,
   pt_PT: 'pt_PT' as const,
   pa: 'pa' as const,
   qu: 'qu' as const,
   ro: 'ro' as const,
   ro_MD: 'ro_MD' as const,
   rm: 'rm' as const,
   rn: 'rn' as const,
   ru: 'ru' as const,
   sm: 'sm' as const,
   sg: 'sg' as const,
   sa: 'sa' as const,
   gd: 'gd' as const,
   sr: 'sr' as const,
   sn: 'sn' as const,
   ii: 'ii' as const,
   sd: 'sd' as const,
   si: 'si' as const,
   sk: 'sk' as const,
   sl: 'sl' as const,
   so: 'so' as const,
   st: 'st' as const,
   es: 'es' as const,
   es_ES: 'es_ES' as const,
   es_MX: 'es_MX' as const,
   su: 'su' as const,
   sw: 'sw' as const,
   sw_CD: 'sw_CD' as const,
   sv: 'sv' as const,
   tg: 'tg' as const,
   ta: 'ta' as const,
   tt: 'tt' as const,
   te: 'te' as const,
   th: 'th' as const,
   bo: 'bo' as const,
   ti: 'ti' as const,
   to: 'to' as const,
   tr: 'tr' as const,
   tk: 'tk' as const,
   uk: 'uk' as const,
   ur: 'ur' as const,
   ug: 'ug' as const,
   uz: 'uz' as const,
   vi: 'vi' as const,
   vo: 'vo' as const,
   cy: 'cy' as const,
   fy: 'fy' as const,
   wo: 'wo' as const,
   xh: 'xh' as const,
   yi: 'yi' as const,
   yo: 'yo' as const,
   zu: 'zu' as const
}

export const enumOrderType = {
   Regular: 'Regular' as const,
   Seller: 'Seller' as const,
   Aggregate: 'Aggregate' as const
}
