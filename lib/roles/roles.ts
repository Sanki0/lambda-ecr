// this file will container the roles for the resources

import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export function createPushRole(stack: cdk.Stack, id: string): iam.Role {
  const role = new iam.Role(stack, id, {
    assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
  });

  role.addToPolicy(
    new iam.PolicyStatement({
      actions: ['ecr:*'],
      resources: ['*'],
    })
  );

  return role;
}