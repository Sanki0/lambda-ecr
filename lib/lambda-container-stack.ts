import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { createPushRole } from './roles/roles';

export class LambdaContainerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ECRRepositoryName = cdk.Fn.importValue('ECRRepositoryName');
    console.log('ECRRepositoryName', ECRRepositoryName);

    const printFunction = new lambda.DockerImageFunction(this, 'PrintFunction', {
      code: lambda.DockerImageCode.fromEcr(ecr.Repository.fromRepositoryName(this, 'Repository', ECRRepositoryName)),
      memorySize: 512,
      timeout: cdk.Duration.minutes(5),
      functionName: 'PrintFunction',
      description: 'Prints the event',
      environment: {
        'SANKI0': 'PROD'
      },


    });

    const pushRole = createPushRole(this, 'PushRole');

    printFunction.role?.grantPassRole(pushRole);



  }
}
