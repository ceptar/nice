export default {
    "scalars": [
        1,
        2,
        4,
        5,
        9,
        11,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        40,
        41,
        42,
        43,
        81,
        107,
        110,
        111
    ],
    "types": {
        "Query": {
            "activeChannel": [
                14
            ],
            "activeCustomer": [
                97
            ],
            "activeOrder": [
                112
            ],
            "availableCountries": [
                151
            ],
            "collections": [
                18,
                {
                    "options": [
                        189
                    ]
                }
            ],
            "collection": [
                15,
                {
                    "id": [
                        1
                    ],
                    "slug": [
                        2
                    ]
                }
            ],
            "eligibleShippingMethods": [
                75
            ],
            "eligiblePaymentMethods": [
                76
            ],
            "facets": [
                103,
                {
                    "options": [
                        190
                    ]
                }
            ],
            "facet": [
                101,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "me": [
                12
            ],
            "nextOrderStates": [
                2
            ],
            "order": [
                112,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "orderByCode": [
                112,
                {
                    "code": [
                        2,
                        "String!"
                    ]
                }
            ],
            "product": [
                140,
                {
                    "id": [
                        1
                    ],
                    "slug": [
                        2
                    ]
                }
            ],
            "products": [
                142,
                {
                    "options": [
                        192
                    ]
                }
            ],
            "search": [
                132,
                {
                    "input": [
                        69,
                        "SearchInput!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Mutation": {
            "addItemToOrder": [
                77,
                {
                    "productVariantId": [
                        1,
                        "ID!"
                    ],
                    "quantity": [
                        4,
                        "Int!"
                    ]
                }
            ],
            "removeOrderLine": [
                78,
                {
                    "orderLineId": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "removeAllOrderLines": [
                78
            ],
            "adjustOrderLine": [
                77,
                {
                    "orderLineId": [
                        1,
                        "ID!"
                    ],
                    "quantity": [
                        4,
                        "Int!"
                    ]
                }
            ],
            "applyCouponCode": [
                80,
                {
                    "couponCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "removeCouponCode": [
                112,
                {
                    "couponCode": [
                        2,
                        "String!"
                    ]
                }
            ],
            "transitionOrderToState": [
                195,
                {
                    "state": [
                        2,
                        "String!"
                    ]
                }
            ],
            "setOrderShippingAddress": [
                207,
                {
                    "input": [
                        72,
                        "CreateAddressInput!"
                    ]
                }
            ],
            "setOrderBillingAddress": [
                207,
                {
                    "input": [
                        72,
                        "CreateAddressInput!"
                    ]
                }
            ],
            "setOrderCustomFields": [
                207,
                {
                    "input": [
                        187,
                        "UpdateOrderInput!"
                    ]
                }
            ],
            "setOrderShippingMethod": [
                79,
                {
                    "shippingMethodId": [
                        1,
                        "[ID!]!"
                    ]
                }
            ],
            "addPaymentToOrder": [
                194,
                {
                    "input": [
                        188,
                        "PaymentInput!"
                    ]
                }
            ],
            "setCustomerForOrder": [
                196,
                {
                    "input": [
                        71,
                        "CreateCustomerInput!"
                    ]
                }
            ],
            "login": [
                205,
                {
                    "username": [
                        2,
                        "String!"
                    ],
                    "password": [
                        2,
                        "String!"
                    ],
                    "rememberMe": [
                        5
                    ]
                }
            ],
            "authenticate": [
                206,
                {
                    "input": [
                        184,
                        "AuthenticationInput!"
                    ],
                    "rememberMe": [
                        5
                    ]
                }
            ],
            "logout": [
                74
            ],
            "registerCustomerAccount": [
                197,
                {
                    "input": [
                        185,
                        "RegisterCustomerInput!"
                    ]
                }
            ],
            "refreshCustomerVerification": [
                198,
                {
                    "emailAddress": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateCustomer": [
                97,
                {
                    "input": [
                        186,
                        "UpdateCustomerInput!"
                    ]
                }
            ],
            "createCustomerAddress": [
                6,
                {
                    "input": [
                        72,
                        "CreateAddressInput!"
                    ]
                }
            ],
            "updateCustomerAddress": [
                6,
                {
                    "input": [
                        73,
                        "UpdateAddressInput!"
                    ]
                }
            ],
            "deleteCustomerAddress": [
                74,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "verifyCustomerAccount": [
                199,
                {
                    "token": [
                        2,
                        "String!"
                    ],
                    "password": [
                        2
                    ]
                }
            ],
            "updateCustomerPassword": [
                200,
                {
                    "currentPassword": [
                        2,
                        "String!"
                    ],
                    "newPassword": [
                        2,
                        "String!"
                    ]
                }
            ],
            "requestUpdateCustomerEmailAddress": [
                201,
                {
                    "password": [
                        2,
                        "String!"
                    ],
                    "newEmailAddress": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateCustomerEmailAddress": [
                202,
                {
                    "token": [
                        2,
                        "String!"
                    ]
                }
            ],
            "requestPasswordReset": [
                203,
                {
                    "emailAddress": [
                        2,
                        "String!"
                    ]
                }
            ],
            "resetPassword": [
                204,
                {
                    "token": [
                        2,
                        "String!"
                    ],
                    "password": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createStripePaymentIntent": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "Boolean": {},
        "Address": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "fullName": [
                2
            ],
            "company": [
                2
            ],
            "streetLine1": [
                2
            ],
            "streetLine2": [
                2
            ],
            "city": [
                2
            ],
            "province": [
                2
            ],
            "postalCode": [
                2
            ],
            "country": [
                151
            ],
            "phoneNumber": [
                2
            ],
            "defaultShippingAddress": [
                5
            ],
            "defaultBillingAddress": [
                5
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Asset": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "type": [
                11
            ],
            "fileSize": [
                4
            ],
            "mimeType": [
                2
            ],
            "width": [
                4
            ],
            "height": [
                4
            ],
            "source": [
                2
            ],
            "preview": [
                2
            ],
            "focalPoint": [
                8
            ],
            "tags": [
                161
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Coordinate": {
            "x": [
                9
            ],
            "y": [
                9
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "AssetList": {
            "items": [
                7
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "AssetType": {},
        "CurrentUser": {
            "id": [
                1
            ],
            "identifier": [
                2
            ],
            "channels": [
                13
            ],
            "__typename": [
                2
            ]
        },
        "CurrentUserChannel": {
            "id": [
                1
            ],
            "token": [
                2
            ],
            "code": [
                2
            ],
            "permissions": [
                22
            ],
            "__typename": [
                2
            ]
        },
        "Channel": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "code": [
                2
            ],
            "token": [
                2
            ],
            "defaultTaxZone": [
                168
            ],
            "defaultShippingZone": [
                168
            ],
            "defaultLanguageCode": [
                110
            ],
            "availableLanguageCodes": [
                110
            ],
            "currencyCode": [
                81
            ],
            "defaultCurrencyCode": [
                81
            ],
            "availableCurrencyCodes": [
                81
            ],
            "trackInventory": [
                5
            ],
            "outOfStockThreshold": [
                4
            ],
            "pricesIncludeTax": [
                5
            ],
            "seller": [
                157
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Collection": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "breadcrumbs": [
                16
            ],
            "position": [
                4
            ],
            "description": [
                2
            ],
            "featuredAsset": [
                7
            ],
            "assets": [
                7
            ],
            "parent": [
                15
            ],
            "parentId": [
                1
            ],
            "children": [
                15
            ],
            "filters": [
                51
            ],
            "translations": [
                17
            ],
            "productVariants": [
                143,
                {
                    "options": [
                        193
                    ]
                }
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CollectionBreadcrumb": {
            "id": [
                1
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CollectionTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CollectionList": {
            "items": [
                15
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "GlobalFlag": {},
        "AdjustmentType": {},
        "DeletionResult": {},
        "Permission": {},
        "SortOrder": {},
        "ErrorCode": {},
        "LogicalOperator": {},
        "NativeAuthStrategyError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InvalidCredentialsError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "authenticationError": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OrderStateTransitionError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "transitionError": [
                2
            ],
            "fromState": [
                2
            ],
            "toState": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "EmailAddressConflictError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "GuestCheckoutError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "errorDetail": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "OrderLimitError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "maxItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "NegativeQuantityError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "InsufficientStockError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "quantityAvailable": [
                4
            ],
            "order": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "CouponCodeInvalidError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "couponCode": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CouponCodeExpiredError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "couponCode": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CouponCodeLimitError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "couponCode": [
                2
            ],
            "limit": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "OrderModificationError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "IneligibleShippingMethodError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NoActiveOrderError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "JSON": {},
        "DateTime": {},
        "Upload": {},
        "Money": {},
        "PaginatedList": {
            "items": [
                45
            ],
            "totalItems": [
                4
            ],
            "on_AssetList": [
                10
            ],
            "on_CollectionList": [
                18
            ],
            "on_CustomerList": [
                98
            ],
            "on_FacetList": [
                103
            ],
            "on_FacetValueList": [
                105
            ],
            "on_HistoryEntryList": [
                108
            ],
            "on_OrderList": [
                115
            ],
            "on_ProductList": [
                142
            ],
            "on_ProductVariantList": [
                143
            ],
            "on_PromotionList": [
                148
            ],
            "on_CountryList": [
                152
            ],
            "on_ProvinceList": [
                154
            ],
            "on_RoleList": [
                156
            ],
            "on_ShippingMethodList": [
                160
            ],
            "on_TagList": [
                162
            ],
            "on_TaxRateList": [
                165
            ],
            "__typename": [
                2
            ]
        },
        "Node": {
            "id": [
                1
            ],
            "on_Address": [
                6
            ],
            "on_Asset": [
                7
            ],
            "on_Channel": [
                14
            ],
            "on_Collection": [
                15
            ],
            "on_CustomerGroup": [
                95
            ],
            "on_Customer": [
                97
            ],
            "on_FacetValue": [
                99
            ],
            "on_Facet": [
                101
            ],
            "on_HistoryEntry": [
                106
            ],
            "on_Order": [
                112
            ],
            "on_OrderLine": [
                118
            ],
            "on_Payment": [
                119
            ],
            "on_Refund": [
                121
            ],
            "on_Fulfillment": [
                123
            ],
            "on_Surcharge": [
                124
            ],
            "on_PaymentMethod": [
                125
            ],
            "on_ProductOptionGroup": [
                127
            ],
            "on_ProductOption": [
                129
            ],
            "on_Product": [
                140
            ],
            "on_ProductVariant": [
                144
            ],
            "on_Promotion": [
                146
            ],
            "on_Country": [
                151
            ],
            "on_Province": [
                153
            ],
            "on_Role": [
                155
            ],
            "on_Seller": [
                157
            ],
            "on_ShippingMethod": [
                158
            ],
            "on_Tag": [
                161
            ],
            "on_TaxCategory": [
                163
            ],
            "on_TaxRate": [
                164
            ],
            "on_User": [
                166
            ],
            "on_AuthenticationMethod": [
                167
            ],
            "on_Zone": [
                168
            ],
            "__typename": [
                2
            ]
        },
        "ErrorResult": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_InvalidCredentialsError": [
                27
            ],
            "on_OrderStateTransitionError": [
                28
            ],
            "on_EmailAddressConflictError": [
                29
            ],
            "on_GuestCheckoutError": [
                30
            ],
            "on_OrderLimitError": [
                31
            ],
            "on_NegativeQuantityError": [
                32
            ],
            "on_InsufficientStockError": [
                33
            ],
            "on_CouponCodeInvalidError": [
                34
            ],
            "on_CouponCodeExpiredError": [
                35
            ],
            "on_CouponCodeLimitError": [
                36
            ],
            "on_OrderModificationError": [
                37
            ],
            "on_IneligibleShippingMethodError": [
                38
            ],
            "on_NoActiveOrderError": [
                39
            ],
            "on_OrderPaymentStateError": [
                169
            ],
            "on_IneligiblePaymentMethodError": [
                170
            ],
            "on_PaymentFailedError": [
                171
            ],
            "on_PaymentDeclinedError": [
                172
            ],
            "on_AlreadyLoggedInError": [
                173
            ],
            "on_MissingPasswordError": [
                174
            ],
            "on_PasswordValidationError": [
                175
            ],
            "on_PasswordAlreadySetError": [
                176
            ],
            "on_VerificationTokenInvalidError": [
                177
            ],
            "on_VerificationTokenExpiredError": [
                178
            ],
            "on_IdentifierChangeTokenInvalidError": [
                179
            ],
            "on_IdentifierChangeTokenExpiredError": [
                180
            ],
            "on_PasswordResetTokenInvalidError": [
                181
            ],
            "on_PasswordResetTokenExpiredError": [
                182
            ],
            "on_NotVerifiedError": [
                183
            ],
            "__typename": [
                2
            ]
        },
        "Adjustment": {
            "adjustmentSource": [
                2
            ],
            "type": [
                20
            ],
            "description": [
                2
            ],
            "amount": [
                43
            ],
            "data": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "TaxLine": {
            "description": [
                2
            ],
            "taxRate": [
                9
            ],
            "__typename": [
                2
            ]
        },
        "ConfigArg": {
            "name": [
                2
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ConfigArgDefinition": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "required": [
                5
            ],
            "defaultValue": [
                40
            ],
            "label": [
                2
            ],
            "description": [
                2
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ConfigurableOperation": {
            "code": [
                2
            ],
            "args": [
                49
            ],
            "__typename": [
                2
            ]
        },
        "ConfigurableOperationDefinition": {
            "code": [
                2
            ],
            "args": [
                50
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "DeletionResponse": {
            "result": [
                21
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ConfigArgInput": {
            "name": [
                2
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ConfigurableOperationInput": {
            "code": [
                2
            ],
            "arguments": [
                54
            ],
            "__typename": [
                2
            ]
        },
        "StringOperators": {
            "eq": [
                2
            ],
            "notEq": [
                2
            ],
            "contains": [
                2
            ],
            "notContains": [
                2
            ],
            "in": [
                2
            ],
            "notIn": [
                2
            ],
            "regex": [
                2
            ],
            "isNull": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "IDOperators": {
            "eq": [
                2
            ],
            "notEq": [
                2
            ],
            "in": [
                2
            ],
            "notIn": [
                2
            ],
            "isNull": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "BooleanOperators": {
            "eq": [
                5
            ],
            "isNull": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "NumberRange": {
            "start": [
                9
            ],
            "end": [
                9
            ],
            "__typename": [
                2
            ]
        },
        "NumberOperators": {
            "eq": [
                9
            ],
            "lt": [
                9
            ],
            "lte": [
                9
            ],
            "gt": [
                9
            ],
            "gte": [
                9
            ],
            "between": [
                59
            ],
            "isNull": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "DateRange": {
            "start": [
                41
            ],
            "end": [
                41
            ],
            "__typename": [
                2
            ]
        },
        "DateOperators": {
            "eq": [
                41
            ],
            "before": [
                41
            ],
            "after": [
                41
            ],
            "between": [
                61
            ],
            "isNull": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "StringListOperators": {
            "inList": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NumberListOperators": {
            "inList": [
                9
            ],
            "__typename": [
                2
            ]
        },
        "BooleanListOperators": {
            "inList": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "IDListOperators": {
            "inList": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "DateListOperators": {
            "inList": [
                41
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueFilterInput": {
            "and": [
                1
            ],
            "or": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "SearchInput": {
            "term": [
                2
            ],
            "facetValueFilters": [
                68
            ],
            "collectionId": [
                1
            ],
            "collectionSlug": [
                2
            ],
            "groupByProduct": [
                5
            ],
            "take": [
                4
            ],
            "skip": [
                4
            ],
            "sort": [
                70
            ],
            "inStock": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "SearchResultSortParameter": {
            "name": [
                23
            ],
            "price": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "CreateCustomerInput": {
            "title": [
                2
            ],
            "firstName": [
                2
            ],
            "lastName": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "emailAddress": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CreateAddressInput": {
            "fullName": [
                2
            ],
            "company": [
                2
            ],
            "streetLine1": [
                2
            ],
            "streetLine2": [
                2
            ],
            "city": [
                2
            ],
            "province": [
                2
            ],
            "postalCode": [
                2
            ],
            "countryCode": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "defaultShippingAddress": [
                5
            ],
            "defaultBillingAddress": [
                5
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "UpdateAddressInput": {
            "id": [
                1
            ],
            "fullName": [
                2
            ],
            "company": [
                2
            ],
            "streetLine1": [
                2
            ],
            "streetLine2": [
                2
            ],
            "city": [
                2
            ],
            "province": [
                2
            ],
            "postalCode": [
                2
            ],
            "countryCode": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "defaultShippingAddress": [
                5
            ],
            "defaultBillingAddress": [
                5
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Success": {
            "success": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "ShippingMethodQuote": {
            "id": [
                1
            ],
            "price": [
                43
            ],
            "priceWithTax": [
                43
            ],
            "code": [
                2
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "metadata": [
                40
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethodQuote": {
            "id": [
                1
            ],
            "code": [
                2
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "isEligible": [
                5
            ],
            "eligibilityMessage": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "UpdateOrderItemsResult": {
            "on_Order": [
                112
            ],
            "on_OrderModificationError": [
                37
            ],
            "on_OrderLimitError": [
                31
            ],
            "on_NegativeQuantityError": [
                32
            ],
            "on_InsufficientStockError": [
                33
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "RemoveOrderItemsResult": {
            "on_Order": [
                112
            ],
            "on_OrderModificationError": [
                37
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "SetOrderShippingMethodResult": {
            "on_Order": [
                112
            ],
            "on_OrderModificationError": [
                37
            ],
            "on_IneligibleShippingMethodError": [
                38
            ],
            "on_NoActiveOrderError": [
                39
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "ApplyCouponCodeResult": {
            "on_Order": [
                112
            ],
            "on_CouponCodeExpiredError": [
                35
            ],
            "on_CouponCodeInvalidError": [
                34
            ],
            "on_CouponCodeLimitError": [
                36
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "CurrencyCode": {},
        "CustomField": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "ui": [
                40
            ],
            "on_StringCustomFieldConfig": [
                83
            ],
            "on_LocaleStringCustomFieldConfig": [
                85
            ],
            "on_IntCustomFieldConfig": [
                86
            ],
            "on_FloatCustomFieldConfig": [
                87
            ],
            "on_BooleanCustomFieldConfig": [
                88
            ],
            "on_DateTimeCustomFieldConfig": [
                89
            ],
            "on_RelationCustomFieldConfig": [
                90
            ],
            "on_TextCustomFieldConfig": [
                91
            ],
            "on_LocaleTextCustomFieldConfig": [
                92
            ],
            "__typename": [
                2
            ]
        },
        "StringCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "length": [
                4
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "pattern": [
                2
            ],
            "options": [
                84
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "StringFieldOption": {
            "value": [
                2
            ],
            "label": [
                93
            ],
            "__typename": [
                2
            ]
        },
        "LocaleStringCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "length": [
                4
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "pattern": [
                2
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "IntCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "min": [
                4
            ],
            "max": [
                4
            ],
            "step": [
                4
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "FloatCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "min": [
                9
            ],
            "max": [
                9
            ],
            "step": [
                9
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "BooleanCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "DateTimeCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "min": [
                2
            ],
            "max": [
                2
            ],
            "step": [
                4
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "RelationCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "entity": [
                2
            ],
            "scalarFields": [
                2
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "TextCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "LocaleTextCustomFieldConfig": {
            "name": [
                2
            ],
            "type": [
                2
            ],
            "list": [
                5
            ],
            "label": [
                93
            ],
            "description": [
                93
            ],
            "readonly": [
                5
            ],
            "internal": [
                5
            ],
            "nullable": [
                5
            ],
            "requiresPermission": [
                22
            ],
            "ui": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "LocalizedString": {
            "languageCode": [
                110
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CustomFieldConfig": {
            "on_StringCustomFieldConfig": [
                83
            ],
            "on_LocaleStringCustomFieldConfig": [
                85
            ],
            "on_IntCustomFieldConfig": [
                86
            ],
            "on_FloatCustomFieldConfig": [
                87
            ],
            "on_BooleanCustomFieldConfig": [
                88
            ],
            "on_DateTimeCustomFieldConfig": [
                89
            ],
            "on_RelationCustomFieldConfig": [
                90
            ],
            "on_TextCustomFieldConfig": [
                91
            ],
            "on_LocaleTextCustomFieldConfig": [
                92
            ],
            "on_CustomField": [
                82
            ],
            "__typename": [
                2
            ]
        },
        "CustomerGroup": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "customers": [
                98,
                {
                    "options": [
                        96
                    ]
                }
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CustomerListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                211
            ],
            "filter": [
                210
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "Customer": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "title": [
                2
            ],
            "firstName": [
                2
            ],
            "lastName": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "emailAddress": [
                2
            ],
            "addresses": [
                6
            ],
            "orders": [
                115,
                {
                    "options": [
                        191
                    ]
                }
            ],
            "user": [
                166
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CustomerList": {
            "items": [
                97
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "FacetValue": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "facet": [
                101
            ],
            "facetId": [
                1
            ],
            "name": [
                2
            ],
            "code": [
                2
            ],
            "translations": [
                100
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Facet": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "code": [
                2
            ],
            "values": [
                99
            ],
            "valueList": [
                105,
                {
                    "options": [
                        104
                    ]
                }
            ],
            "translations": [
                102
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "FacetTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "FacetList": {
            "items": [
                101
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                215
            ],
            "filter": [
                214
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueList": {
            "items": [
                99
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "HistoryEntry": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "type": [
                107
            ],
            "data": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "HistoryEntryType": {},
        "HistoryEntryList": {
            "items": [
                106
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "HistoryEntryListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                217
            ],
            "filter": [
                216
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "LanguageCode": {},
        "OrderType": {},
        "Order": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "type": [
                111
            ],
            "orderPlacedAt": [
                41
            ],
            "code": [
                2
            ],
            "state": [
                2
            ],
            "active": [
                5
            ],
            "customer": [
                97
            ],
            "shippingAddress": [
                114
            ],
            "billingAddress": [
                114
            ],
            "lines": [
                118
            ],
            "surcharges": [
                124
            ],
            "discounts": [
                117
            ],
            "couponCodes": [
                2
            ],
            "promotions": [
                146
            ],
            "payments": [
                119
            ],
            "fulfillments": [
                123
            ],
            "totalQuantity": [
                4
            ],
            "subTotal": [
                43
            ],
            "subTotalWithTax": [
                43
            ],
            "currencyCode": [
                81
            ],
            "shippingLines": [
                116
            ],
            "shipping": [
                43
            ],
            "shippingWithTax": [
                43
            ],
            "total": [
                43
            ],
            "totalWithTax": [
                43
            ],
            "taxSummary": [
                113
            ],
            "history": [
                108,
                {
                    "options": [
                        109
                    ]
                }
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "OrderTaxSummary": {
            "description": [
                2
            ],
            "taxRate": [
                9
            ],
            "taxBase": [
                43
            ],
            "taxTotal": [
                43
            ],
            "__typename": [
                2
            ]
        },
        "OrderAddress": {
            "fullName": [
                2
            ],
            "company": [
                2
            ],
            "streetLine1": [
                2
            ],
            "streetLine2": [
                2
            ],
            "city": [
                2
            ],
            "province": [
                2
            ],
            "postalCode": [
                2
            ],
            "country": [
                2
            ],
            "countryCode": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "OrderList": {
            "items": [
                112
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "ShippingLine": {
            "id": [
                1
            ],
            "shippingMethod": [
                158
            ],
            "price": [
                43
            ],
            "priceWithTax": [
                43
            ],
            "discountedPrice": [
                43
            ],
            "discountedPriceWithTax": [
                43
            ],
            "discounts": [
                117
            ],
            "__typename": [
                2
            ]
        },
        "Discount": {
            "adjustmentSource": [
                2
            ],
            "type": [
                20
            ],
            "description": [
                2
            ],
            "amount": [
                43
            ],
            "amountWithTax": [
                43
            ],
            "__typename": [
                2
            ]
        },
        "OrderLine": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "productVariant": [
                144
            ],
            "featuredAsset": [
                7
            ],
            "unitPrice": [
                43
            ],
            "unitPriceWithTax": [
                43
            ],
            "unitPriceChangeSinceAdded": [
                43
            ],
            "unitPriceWithTaxChangeSinceAdded": [
                43
            ],
            "discountedUnitPrice": [
                43
            ],
            "discountedUnitPriceWithTax": [
                43
            ],
            "proratedUnitPrice": [
                43
            ],
            "proratedUnitPriceWithTax": [
                43
            ],
            "quantity": [
                4
            ],
            "orderPlacedQuantity": [
                4
            ],
            "taxRate": [
                9
            ],
            "linePrice": [
                43
            ],
            "linePriceWithTax": [
                43
            ],
            "discountedLinePrice": [
                43
            ],
            "discountedLinePriceWithTax": [
                43
            ],
            "proratedLinePrice": [
                43
            ],
            "proratedLinePriceWithTax": [
                43
            ],
            "lineTax": [
                43
            ],
            "discounts": [
                117
            ],
            "taxLines": [
                48
            ],
            "order": [
                112
            ],
            "fulfillmentLines": [
                122
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Payment": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "method": [
                2
            ],
            "amount": [
                43
            ],
            "state": [
                2
            ],
            "transactionId": [
                2
            ],
            "errorMessage": [
                2
            ],
            "refunds": [
                121
            ],
            "metadata": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "RefundLine": {
            "orderLine": [
                118
            ],
            "orderLineId": [
                1
            ],
            "quantity": [
                4
            ],
            "refund": [
                121
            ],
            "refundId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Refund": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "items": [
                43
            ],
            "shipping": [
                43
            ],
            "adjustment": [
                43
            ],
            "total": [
                43
            ],
            "method": [
                2
            ],
            "state": [
                2
            ],
            "transactionId": [
                2
            ],
            "reason": [
                2
            ],
            "lines": [
                120
            ],
            "paymentId": [
                1
            ],
            "metadata": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "FulfillmentLine": {
            "orderLine": [
                118
            ],
            "orderLineId": [
                1
            ],
            "quantity": [
                4
            ],
            "fulfillment": [
                123
            ],
            "fulfillmentId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Fulfillment": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "lines": [
                122
            ],
            "summary": [
                122
            ],
            "state": [
                2
            ],
            "method": [
                2
            ],
            "trackingCode": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "Surcharge": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "description": [
                2
            ],
            "sku": [
                2
            ],
            "taxLines": [
                48
            ],
            "price": [
                43
            ],
            "priceWithTax": [
                43
            ],
            "taxRate": [
                9
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethod": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "code": [
                2
            ],
            "description": [
                2
            ],
            "enabled": [
                5
            ],
            "checker": [
                51
            ],
            "handler": [
                51
            ],
            "translations": [
                126
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "PaymentMethodTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProductOptionGroup": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "name": [
                2
            ],
            "options": [
                129
            ],
            "translations": [
                128
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ProductOptionGroupTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProductOption": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "name": [
                2
            ],
            "groupId": [
                1
            ],
            "group": [
                127
            ],
            "translations": [
                130
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ProductOptionTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SearchReindexResponse": {
            "success": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "SearchResponse": {
            "items": [
                136
            ],
            "totalItems": [
                4
            ],
            "facetValues": [
                133
            ],
            "collections": [
                134
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueResult": {
            "facetValue": [
                99
            ],
            "count": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "CollectionResult": {
            "collection": [
                15
            ],
            "count": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "SearchResultAsset": {
            "id": [
                1
            ],
            "preview": [
                2
            ],
            "focalPoint": [
                8
            ],
            "__typename": [
                2
            ]
        },
        "SearchResult": {
            "sku": [
                2
            ],
            "slug": [
                2
            ],
            "productId": [
                1
            ],
            "productName": [
                2
            ],
            "productAsset": [
                135
            ],
            "productVariantId": [
                1
            ],
            "productVariantName": [
                2
            ],
            "productVariantAsset": [
                135
            ],
            "price": [
                137
            ],
            "priceWithTax": [
                137
            ],
            "currencyCode": [
                81
            ],
            "description": [
                2
            ],
            "facetIds": [
                1
            ],
            "facetValueIds": [
                1
            ],
            "collectionIds": [
                1
            ],
            "score": [
                9
            ],
            "inStock": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "SearchResultPrice": {
            "on_PriceRange": [
                139
            ],
            "on_SinglePrice": [
                138
            ],
            "__typename": [
                2
            ]
        },
        "SinglePrice": {
            "value": [
                43
            ],
            "__typename": [
                2
            ]
        },
        "PriceRange": {
            "min": [
                43
            ],
            "max": [
                43
            ],
            "__typename": [
                2
            ]
        },
        "Product": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "description": [
                2
            ],
            "enabled": [
                5
            ],
            "featuredAsset": [
                7
            ],
            "assets": [
                7
            ],
            "variants": [
                144
            ],
            "variantList": [
                143,
                {
                    "options": [
                        193
                    ]
                }
            ],
            "optionGroups": [
                127
            ],
            "facetValues": [
                99
            ],
            "translations": [
                141
            ],
            "collections": [
                15
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ProductTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "slug": [
                2
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProductList": {
            "items": [
                140
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariantList": {
            "items": [
                144
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariant": {
            "id": [
                1
            ],
            "product": [
                140
            ],
            "productId": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "sku": [
                2
            ],
            "name": [
                2
            ],
            "featuredAsset": [
                7
            ],
            "assets": [
                7
            ],
            "price": [
                43
            ],
            "currencyCode": [
                81
            ],
            "priceWithTax": [
                43
            ],
            "stockLevel": [
                2
            ],
            "taxRateApplied": [
                164
            ],
            "taxCategory": [
                163
            ],
            "options": [
                129
            ],
            "facetValues": [
                99
            ],
            "translations": [
                145
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariantTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Promotion": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "startsAt": [
                41
            ],
            "endsAt": [
                41
            ],
            "couponCode": [
                2
            ],
            "perCustomerUsageLimit": [
                4
            ],
            "usageLimit": [
                4
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "enabled": [
                5
            ],
            "conditions": [
                51
            ],
            "actions": [
                51
            ],
            "translations": [
                147
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "PromotionTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PromotionList": {
            "items": [
                146
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Region": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "type": [
                2
            ],
            "name": [
                2
            ],
            "enabled": [
                5
            ],
            "parent": [
                149
            ],
            "parentId": [
                1
            ],
            "translations": [
                150
            ],
            "on_Country": [
                151
            ],
            "on_Province": [
                153
            ],
            "__typename": [
                2
            ]
        },
        "RegionTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Country": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "type": [
                2
            ],
            "name": [
                2
            ],
            "enabled": [
                5
            ],
            "parent": [
                149
            ],
            "parentId": [
                1
            ],
            "translations": [
                150
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CountryList": {
            "items": [
                151
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Province": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "type": [
                2
            ],
            "name": [
                2
            ],
            "enabled": [
                5
            ],
            "parent": [
                149
            ],
            "parentId": [
                1
            ],
            "translations": [
                150
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ProvinceList": {
            "items": [
                153
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Role": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "code": [
                2
            ],
            "description": [
                2
            ],
            "permissions": [
                22
            ],
            "channels": [
                14
            ],
            "__typename": [
                2
            ]
        },
        "RoleList": {
            "items": [
                155
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Seller": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ShippingMethod": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "code": [
                2
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "fulfillmentHandlerCode": [
                2
            ],
            "checker": [
                51
            ],
            "calculator": [
                51
            ],
            "translations": [
                159
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "ShippingMethodTranslation": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "languageCode": [
                110
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ShippingMethodList": {
            "items": [
                158
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Tag": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "value": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "TagList": {
            "items": [
                161
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "TaxCategory": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "isDefault": [
                5
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "TaxRate": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "enabled": [
                5
            ],
            "value": [
                9
            ],
            "category": [
                163
            ],
            "zone": [
                168
            ],
            "customerGroup": [
                95
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "TaxRateList": {
            "items": [
                164
            ],
            "totalItems": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "User": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "identifier": [
                2
            ],
            "verified": [
                5
            ],
            "roles": [
                155
            ],
            "lastLogin": [
                41
            ],
            "authenticationMethods": [
                167
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "AuthenticationMethod": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "strategy": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Zone": {
            "id": [
                1
            ],
            "createdAt": [
                41
            ],
            "updatedAt": [
                41
            ],
            "name": [
                2
            ],
            "members": [
                149
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "OrderPaymentStateError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "IneligiblePaymentMethodError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "eligibilityCheckerMessage": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentFailedError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "paymentErrorMessage": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PaymentDeclinedError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "paymentErrorMessage": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AlreadyLoggedInError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "MissingPasswordError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PasswordValidationError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "validationErrorMessage": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PasswordAlreadySetError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "VerificationTokenInvalidError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "VerificationTokenExpiredError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "IdentifierChangeTokenInvalidError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "IdentifierChangeTokenExpiredError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PasswordResetTokenInvalidError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "PasswordResetTokenExpiredError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NotVerifiedError": {
            "errorCode": [
                24
            ],
            "message": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AuthenticationInput": {
            "native": [
                224
            ],
            "__typename": [
                2
            ]
        },
        "RegisterCustomerInput": {
            "emailAddress": [
                2
            ],
            "title": [
                2
            ],
            "firstName": [
                2
            ],
            "lastName": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "password": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UpdateCustomerInput": {
            "title": [
                2
            ],
            "firstName": [
                2
            ],
            "lastName": [
                2
            ],
            "phoneNumber": [
                2
            ],
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "UpdateOrderInput": {
            "customFields": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "PaymentInput": {
            "method": [
                2
            ],
            "metadata": [
                40
            ],
            "__typename": [
                2
            ]
        },
        "CollectionListOptions": {
            "topLevelOnly": [
                5
            ],
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                219
            ],
            "filter": [
                218
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "FacetListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                221
            ],
            "filter": [
                220
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "OrderListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                213
            ],
            "filter": [
                212
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "ProductListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                223
            ],
            "filter": [
                222
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariantListOptions": {
            "skip": [
                4
            ],
            "take": [
                4
            ],
            "sort": [
                209
            ],
            "filter": [
                208
            ],
            "filterOperator": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "AddPaymentToOrderResult": {
            "on_Order": [
                112
            ],
            "on_OrderPaymentStateError": [
                169
            ],
            "on_IneligiblePaymentMethodError": [
                170
            ],
            "on_PaymentFailedError": [
                171
            ],
            "on_PaymentDeclinedError": [
                172
            ],
            "on_OrderStateTransitionError": [
                28
            ],
            "on_NoActiveOrderError": [
                39
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "TransitionOrderToStateResult": {
            "on_Order": [
                112
            ],
            "on_OrderStateTransitionError": [
                28
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "SetCustomerForOrderResult": {
            "on_Order": [
                112
            ],
            "on_AlreadyLoggedInError": [
                173
            ],
            "on_EmailAddressConflictError": [
                29
            ],
            "on_NoActiveOrderError": [
                39
            ],
            "on_GuestCheckoutError": [
                30
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "RegisterCustomerAccountResult": {
            "on_Success": [
                74
            ],
            "on_MissingPasswordError": [
                174
            ],
            "on_PasswordValidationError": [
                175
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "RefreshCustomerVerificationResult": {
            "on_Success": [
                74
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "VerifyCustomerAccountResult": {
            "on_CurrentUser": [
                12
            ],
            "on_VerificationTokenInvalidError": [
                177
            ],
            "on_VerificationTokenExpiredError": [
                178
            ],
            "on_MissingPasswordError": [
                174
            ],
            "on_PasswordValidationError": [
                175
            ],
            "on_PasswordAlreadySetError": [
                176
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "UpdateCustomerPasswordResult": {
            "on_Success": [
                74
            ],
            "on_InvalidCredentialsError": [
                27
            ],
            "on_PasswordValidationError": [
                175
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "RequestUpdateCustomerEmailAddressResult": {
            "on_Success": [
                74
            ],
            "on_InvalidCredentialsError": [
                27
            ],
            "on_EmailAddressConflictError": [
                29
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "UpdateCustomerEmailAddressResult": {
            "on_Success": [
                74
            ],
            "on_IdentifierChangeTokenInvalidError": [
                179
            ],
            "on_IdentifierChangeTokenExpiredError": [
                180
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "RequestPasswordResetResult": {
            "on_Success": [
                74
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "ResetPasswordResult": {
            "on_CurrentUser": [
                12
            ],
            "on_PasswordResetTokenInvalidError": [
                181
            ],
            "on_PasswordResetTokenExpiredError": [
                182
            ],
            "on_PasswordValidationError": [
                175
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_NotVerifiedError": [
                183
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "NativeAuthenticationResult": {
            "on_CurrentUser": [
                12
            ],
            "on_InvalidCredentialsError": [
                27
            ],
            "on_NotVerifiedError": [
                183
            ],
            "on_NativeAuthStrategyError": [
                26
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "AuthenticationResult": {
            "on_CurrentUser": [
                12
            ],
            "on_InvalidCredentialsError": [
                27
            ],
            "on_NotVerifiedError": [
                183
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "ActiveOrderResult": {
            "on_Order": [
                112
            ],
            "on_NoActiveOrderError": [
                39
            ],
            "on_Node": [
                45
            ],
            "on_ErrorResult": [
                46
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariantFilterParameter": {
            "id": [
                57
            ],
            "productId": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "languageCode": [
                56
            ],
            "sku": [
                56
            ],
            "name": [
                56
            ],
            "price": [
                60
            ],
            "currencyCode": [
                56
            ],
            "priceWithTax": [
                60
            ],
            "stockLevel": [
                56
            ],
            "_and": [
                208
            ],
            "_or": [
                208
            ],
            "__typename": [
                2
            ]
        },
        "ProductVariantSortParameter": {
            "id": [
                23
            ],
            "productId": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "sku": [
                23
            ],
            "name": [
                23
            ],
            "price": [
                23
            ],
            "priceWithTax": [
                23
            ],
            "stockLevel": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "CustomerFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "title": [
                56
            ],
            "firstName": [
                56
            ],
            "lastName": [
                56
            ],
            "phoneNumber": [
                56
            ],
            "emailAddress": [
                56
            ],
            "_and": [
                210
            ],
            "_or": [
                210
            ],
            "__typename": [
                2
            ]
        },
        "CustomerSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "title": [
                23
            ],
            "firstName": [
                23
            ],
            "lastName": [
                23
            ],
            "phoneNumber": [
                23
            ],
            "emailAddress": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "OrderFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "type": [
                56
            ],
            "orderPlacedAt": [
                62
            ],
            "code": [
                56
            ],
            "state": [
                56
            ],
            "active": [
                58
            ],
            "totalQuantity": [
                60
            ],
            "subTotal": [
                60
            ],
            "subTotalWithTax": [
                60
            ],
            "currencyCode": [
                56
            ],
            "shipping": [
                60
            ],
            "shippingWithTax": [
                60
            ],
            "total": [
                60
            ],
            "totalWithTax": [
                60
            ],
            "_and": [
                212
            ],
            "_or": [
                212
            ],
            "__typename": [
                2
            ]
        },
        "OrderSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "orderPlacedAt": [
                23
            ],
            "code": [
                23
            ],
            "state": [
                23
            ],
            "totalQuantity": [
                23
            ],
            "subTotal": [
                23
            ],
            "subTotalWithTax": [
                23
            ],
            "shipping": [
                23
            ],
            "shippingWithTax": [
                23
            ],
            "total": [
                23
            ],
            "totalWithTax": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "languageCode": [
                56
            ],
            "facetId": [
                57
            ],
            "name": [
                56
            ],
            "code": [
                56
            ],
            "_and": [
                214
            ],
            "_or": [
                214
            ],
            "__typename": [
                2
            ]
        },
        "FacetValueSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "facetId": [
                23
            ],
            "name": [
                23
            ],
            "code": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "HistoryEntryFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "type": [
                56
            ],
            "_and": [
                216
            ],
            "_or": [
                216
            ],
            "__typename": [
                2
            ]
        },
        "HistoryEntrySortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "CollectionFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "languageCode": [
                56
            ],
            "name": [
                56
            ],
            "slug": [
                56
            ],
            "position": [
                60
            ],
            "description": [
                56
            ],
            "parentId": [
                57
            ],
            "_and": [
                218
            ],
            "_or": [
                218
            ],
            "__typename": [
                2
            ]
        },
        "CollectionSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "name": [
                23
            ],
            "slug": [
                23
            ],
            "position": [
                23
            ],
            "description": [
                23
            ],
            "parentId": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "FacetFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "languageCode": [
                56
            ],
            "name": [
                56
            ],
            "code": [
                56
            ],
            "_and": [
                220
            ],
            "_or": [
                220
            ],
            "__typename": [
                2
            ]
        },
        "FacetSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "name": [
                23
            ],
            "code": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "ProductFilterParameter": {
            "id": [
                57
            ],
            "createdAt": [
                62
            ],
            "updatedAt": [
                62
            ],
            "languageCode": [
                56
            ],
            "name": [
                56
            ],
            "slug": [
                56
            ],
            "description": [
                56
            ],
            "enabled": [
                58
            ],
            "_and": [
                222
            ],
            "_or": [
                222
            ],
            "__typename": [
                2
            ]
        },
        "ProductSortParameter": {
            "id": [
                23
            ],
            "createdAt": [
                23
            ],
            "updatedAt": [
                23
            ],
            "name": [
                23
            ],
            "slug": [
                23
            ],
            "description": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "NativeAuthInput": {
            "username": [
                2
            ],
            "password": [
                2
            ],
            "__typename": [
                2
            ]
        }
    }
}