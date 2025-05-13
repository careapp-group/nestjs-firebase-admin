# This fork is abandoned

We have decided to stop maintaining this fork into the future. This package is not really necessary as you can easily make a NestJS module that provides access to the Firebase services directly. For example:

```ts
@Module({})
export class FirebaseModule {
  static forRoot({ credential }: { credential: Credential }): DynamicModule {
    initializeApp({
      credential: credential,
    });
    return {
      module: FirebaseModule,
      global: true,
      providers: [
        {
          provide: Messaging,
          useFactory: () => getMessaging(),
        },
        {
          provide: RemoteConfig,
          useFactory: () => getRemoteConfig(),
        },
      ],
      exports: [Messaging, RemoteConfig],
    };
  }
}
```

This approach makes it easier to stay up to date with NestJS and Firebase, as you can control the versions of those packages you are using directly.

## Description

Firebase Admin Module for [Nest.js Framework](https://nestjs.com/)

## Installation

```bash
$ yarn add @aginix/nestjs-firebase-admin
```

### Import module

```typescript
import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault(),
      }),
    }),
  ],
})
export class AppModule {}
```

## Example

### Inject Authentication Service

```typescript
import { Injectable } from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class AppService {
  constructor(private firebaseAuth: FirebaseAuthenticationService) {}

  getUsers() {
    return this.firebaseAuth.listUsers();
  }
}
```

## Compatibility Table

| firebase-admin | NestJS Library |
| -------------- | -------------- |
| `9.xx`         | `master`       |
| `8.xx`         | `1.xx`         |

## License

MIT © [Aginix Technologies Co., Ltd.](https://github.com/Aginix/nestjs-firebase-admin)
