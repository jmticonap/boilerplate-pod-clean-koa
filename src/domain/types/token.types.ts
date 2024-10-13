export type TokenUpdateErrorKey = 'TOKEN_NOT_FOUND' | 'TOKEN_UPDATE_NOT_FOUND';

export type TokenGenericErrorKey =
    | 'ERROR_SERVER_INTERNAL'
    | 'BAD_REQUEST'
    | 'BAD_REQUEST_PARAM'
    | 'UNAUTHORIZED'
    | 'LIMIT_YAPE_AMOUNT';

export type TokenDeactivateKey =
    | 'SUCCESS_TOKEN'
    | 'SUCCESS_CARD'
    | 'WARNING_TOKEN'
    | 'WARNING_CARD'
    | 'NOT_ACTIVE'
    | 'FIELD_INVALID';

export type TokenGetMassiveErrorKey =
    | 'INVALID_PARAMETER_ID'
    | 'NOT_FOUND_MASSIVE'
    | 'NOT_FOUND_MASSIVE_EMPTY'
    | 'BAD_REQUEST'
    | 'BAD_REQUEST_EMPTY'
    | 'BAD_REQUEST_TOKEN';

export type TokenVerifyErrorKey = 'INACTIVE';

export type TokenCreateYapeErrorKey =
    | 'INVALID_METADATA'
    | 'INVALID_PARAMETER_OTP'
    | 'INVALID_PARAMETER_NUMBER_PHONE'
    | 'INVALID_PARAMETER_AMOUNT'
    | 'EXCEEDED_THE_LIMIT'
    | 'INVALID_REQUEST';

export type TokenFisRequestErrorKey = 'FIELD_TOKEN_FIS_NOT_FOUND' | 'FIELD_TOKEN_FIS_INVALID' | 'TOKEN_FIS_NOT_FOUND';

export type TransactionRefRequestErrorKey = 'FIELD_NOT_FOUND' | 'FIELD_INVALID';

export type TokenHashCardRequestErrorKey = 'FIELD_NOT_FOUND' | 'FIELD_INVALID';

export type TokenCreateErrorKey =
    | 'INVALID_PARAMETER_CARD_NUMBER'
    | 'INVALID_SANDBOX_CARD'
    | 'INVALID_PARAMETER_CVV'
    | 'INVALID_PARAMETER_AMOUNT'
    | 'INVALID_PARAMETER_EXPIRATION_MONTH'
    | 'INVALID_PARAMETER_EXPIRATION_YEAR'
    | 'INVALID_PARAMETER_EMAIL'
    | 'INVALID_PARAMETER_FINGERPRINT'
    | 'FAIL_VALIDATE_ORIGIN_SPONSOR';

export type TokenListErrorKey =
    | 'CREATION_DATE'
    | 'CREATION_DATE_FROM'
    | 'CREATION_DATE_TO'
    | 'CARD_BRAND'
    | 'CARD_TYPE'
    | 'DEVICE_TYPE'
    | 'BIN'
    | 'COUNTRY_CODE'
    | 'LIMIT'
    | 'BEFORE'
    | 'AFTER'
    | 'INVALID_BEFORE_TOKEN_NOT_FOUND'
    | 'INVALID_AFTER_TOKEN_NOT_FOUND';

export type TokenActivateCardKey = 'TOKEN_ID_INVALID' | 'CARD_ID_INVALID' | 'TOKEN_CARD_SAVE_SUCCESS';

export type CommonExceptionListType =
    | TokenUpdateErrorKey
    | TokenGenericErrorKey
    | TokenDeactivateKey
    | TokenGetMassiveErrorKey
    | TokenVerifyErrorKey
    | TokenCreateYapeErrorKey
    | TokenFisRequestErrorKey
    | TransactionRefRequestErrorKey
    | TokenHashCardRequestErrorKey
    | TokenCreateErrorKey
    | TokenListErrorKey
    | TokenActivateCardKey;
