import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';

export class LambdaContainerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const printFunction = new lambda.DockerImageFunction(this, 'PrintFunction', {
      code: lambda.DockerImageCode.fromEcr(ecr.Repository.fromRepositoryArn(this, 'Repo', 'arn:aws:ecr:us-east-1:822153354071:repository/repository')),
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      functionName: 'PrintFunction',
      description: 'Prints the event',
      environment: {
        'SANKI0': 'PROD'
      }


    });

    printFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ecr:*'],
        resources: ['*'],
      })
    )



  }
}
