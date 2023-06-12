import { gql } from 'apollo-server-express';
const companyDefs = gql `
type Company {
    company_id: String!
    name: String!
    location: String!
    branches: [Branch!]!
    operators: [Operator!]!
    free_operators: [Operator]
    billing: String!
    contact_info: String!
    created: Date!
    last_modified: Date
    status: Status!
    distributor_id: String!
    users_id: [String]
    barcode: [String]
    bra_counter: Int!
    ope_counter: Int!
    shi_counter: Int!
    alert_params: AlertParams!
    custom_checks: [CustomCheck]!
    sense_frequency: [Int!]!
    language: String
    gmt: String
  }

  type Operator {
    operator_id: String!
    name: String!
    code: String!
    mail: String
    created: Date!
    last_modified: Date
    status: Status!
    access_to: Access!
    type: String!
  }
  type Branch {
    branch_id: String!
    name: String!
    address: String!
    type: String!
    owned: Boolean!
    created: Date!
    last_modified: Date
    status: Status!
  }

  type AlertParams {
    temperature_alerts: [TemperatureAlert!]!
    acceleration_alerts: [AccelerationAlert!]!
  }

  input AlertParamsInput {
    temperature_alerts: [TemperatureAlertInput!]
    acceleration_alerts: [AccelerationAlertInput!]
  }

  input TemperatureAlertInput {
    name: String!
    min: Int!
    max: Int!
  }

  input AccelerationAlertInput {
    name: String!
    value: Int
  }

  type TemperatureAlert {
    name: String!
    max: Int!
    min: Int!
  }

  type AccelerationAlert {
    name: String!
    value: Int
  }
  type CustomCheck {
    name: String!
    mandatory: Boolean!
  }
  
  enum Status{
    ACTIVE
    INACTIVE
  }
  scalar Date
  type Access {
    send: Boolean!
    receive: Boolean!
    checkpoint: Boolean!
    calibrate: Boolean!
    recursive: Boolean!
    geolocation: Boolean!
    dash_report: Boolean!
    dash_intransit: Boolean!
    dash_control: Boolean!
  }
`
export default companyDefs