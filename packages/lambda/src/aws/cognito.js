import AWS from 'aws-sdk'

export default class Cognito {
  createUserPool (region, poolName, serviceName, adminPageURL, snsCallerArn) {
    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region })
    const params = {
      PoolName: poolName,
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true,
        UnusedAccountValidityDays: 7,
        InviteMessageTemplate: {
          EmailSubject: `${serviceName} StatusPage - Your temporary password`,
          EmailMessage: `Your username is {username} and temporary password is {####}. Access ${adminPageURL} and sign in to admin console.`
        }
      },
      AliasAttributes: ['email'],
      AutoVerifiedAttributes: ['email'],
      EmailVerificationSubject: `${serviceName} StatusPage - Your verification code`,
      MfaConfiguration: 'OPTIONAL',
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: false,
          RequireUppercase: true
        }
      },
      Schema: [{
        Name: 'email',
        StringAttributeConstraints: {
          MinLength: '0',
          MaxLength: '2048'
        },
        DeveloperOnlyAttribute: false,
        Required: true,
        AttributeDataType: 'String',
        Mutable: true
      }],
      SmsConfiguration: {
        SnsCallerArn: snsCallerArn,
        ExternalId: snsCallerArn
      }
    }
    return new Promise((resolve, reject) => {
      cognito.createUserPool(params, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  deleteUserPool (region, userPoolID) {
    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region })
    const params = {
      UserPoolId: userPoolID
    }
    return new Promise((resolve, reject) => {
      cognito.deleteUserPool(params, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  createUserPoolClient (region, userPoolID, clientName) {
    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region })
    const params = {
      UserPoolId: userPoolID,
      ClientName: clientName
    }
    return new Promise((resolve, reject) => {
      cognito.createUserPoolClient(params, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  createUser (region, userPoolId, userName, email) {
    const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region })
    const params = {
      UserPoolId: userPoolId,
      Username: userName,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        {Name: 'email', Value: email},
        {Name: 'email_verified', Value: 'true'}
      ]
    }
    return new Promise((resolve, reject) => {
      cognito.adminCreateUser(params, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }
}