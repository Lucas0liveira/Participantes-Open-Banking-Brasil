export const PAGE_SIZE = 10

export const ROLE_OPTIONS = [
  { label: 'PAGTO', code: 'PAGTO' },
  { label: 'CONTA', code: 'CONTA' },
  { label: 'DADOS', code: 'DADOS' },
  { label: 'CCORR', code: 'CCORR' },
  { label: 'TS', code: 'TS' },
  { label: 'FORTEC', code: 'FORTEC' },
  { label: 'RA/CA', code: 'RA/CA' },
  { label: 'TRD', code: 'TRD' },
]

export const STATUS_OPTIONS = [
  { label: 'Active', code: 'Active' },
  { label: 'Inactive', code: 'Inactive' },
  { label: 'Both', code: '' },
]

export const ENDPOINTS = [
  { label: 'Open Banking Brasil Sandbox', code: 'sandbox' },
  { label: 'Open Banking Brasil Production', code: 'production' },
  { label: 'OPINBRasil', code: 'op' },
]

export const API_RESOURCE_OPTIONS = [
  { label: 'payments-pix', code: 'payments-pix' },
  { label: 'payments-consents', code: 'payments-consents' },
  { label: 'admin', code: 'admin' },
  { label: 'discovery', code: 'discovery' },
  { label: 'consents', code: 'consents' },
  { label: 'customers-business', code: 'customers-business' },
  { label: 'customers-personal', code: 'customers-personal' },
  { label: 'resources', code: 'resources' },
  { label: 'financings', code: 'financings' },
  { label: 'loans', code: 'loans' },
  { label: 'accounts', code: 'accounts' },
  { label: 'credit-cards-accounts', code: 'credit-cards-accounts' },
  { label: 'products-services', code: 'products-services' },
  { label: 'invoice-financings', code: 'invoice-financings' },
  { label: 'channels', code: 'channels' },
  {
    label: 'unarranged-accounts-overdraft',
    code: 'unarranged-accounts-overdraft',
  },
  { label: 'opendata-investments_funds', code: 'opendata-investments_funds' },
  { label: 'channels-branches', code: 'channels-branches' },
  { label: 'other', code: 'other' },
  { label: 'invoice-financing', code: 'invoice-financing' },
]
