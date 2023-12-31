import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';



import * as path from 'path';

export class EcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, 'Repository', {
      repositoryName: 'repository',
      imageScanOnPush: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });


    // const imagePrint = new ecr_assets.DockerImageAsset(this, 'ImagePrint', {
    //   directory: path.join(__dirname, '../assets/functions/print'),
    //   file: 'Dockerfile',

    // });



    // new cdk.CfnOutput(this, 'ImagePrintUri', {
    //   value: imagePrint.imageUri,
    // });

    new cdk.CfnOutput(this, 'ECRRepositoryUri', {
      value: repository.repositoryUri,
    });

    new cdk.CfnOutput(this, 'ECRRepositoryArn', {
      value: repository.repositoryArn,
    });

    new cdk.CfnOutput(this, 'ECRRepositoryName', {
      value: repository.repositoryName,
      exportName: 'ECRRepositoryName',
    });




  }
}

