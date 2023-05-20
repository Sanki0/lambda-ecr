import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class LambdaContainerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const printFunction = new lambda.DockerImageFunction(this, 'PrintFunction', {
      code: lambda.DockerImageCode.fromEcr(ecr.Repository.fromRepositoryName(this, 'Repository', 'lambda-container'), {
        tag: 'latest'
      }),
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),


    });


  }
}
