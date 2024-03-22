#!/usr/bin/ev node
import 'source-map-support/register';

import * as cdk from '@aws-cdk/core';

import { CICDStack } from './ci-cd-stack';
import { CoreStack } from './core-stack';

const app = new cdk.App();
const coreStack = new CoreStack(app, "StaticNextJsStack");
const cicdStack = new CICDStack(
  app,
  "ExampleCICDStack",
  coreStack.s3BucketName,
  coreStack.s3BucketArn
);
// Dependency on CoreStack
cicdStack.addDependency(coreStack);
