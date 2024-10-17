import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Message, BatchResponse, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FirebaseMessagingService {
  constructor(public readonly app: admin.app.App) {}

  get messaging() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.messaging();
  }

  /**
   @deprecated: This will be removed when the HTTP/2 transport implementation reaches the same stability as the legacy HTTP/1.1 implementation.
   */
  enableLegacyHttpTransport(): void {
    return this.messaging.enableLegacyHttpTransport();
  }

  sendEach(messages: Message[], dryRun?: boolean): Promise<BatchResponse> {
    return this.messaging.sendEach(messages, dryRun);
  }

  sendEachForMulticast(message: MulticastMessage, dryRun?: boolean): Promise<BatchResponse> {
    return this.messaging.sendEachForMulticast(message, dryRun);
  }

  send(message: admin.messaging.Message, dryRun?: boolean): Promise<string> {
    return this.messaging.send(message, dryRun);
  }
  /**
   * @deprecated — Use Messaging.sendEach instead.
   */
  sendAll(messages: admin.messaging.Message[], dryRun?: boolean): Promise<admin.messaging.BatchResponse> {
    return this.messaging.sendAll(messages, dryRun);
  }
  /**
   * @deprecated — Use Messaging.sendEachForMulticast instead.
   */
  sendMulticast(message: admin.messaging.MulticastMessage, dryRun?: boolean): Promise<admin.messaging.BatchResponse> {
    return this.messaging.sendMulticast(message, dryRun);
  }

  /**
   * @deprecated — Use Messaging.send instead.
   */
  sendToDevice(
    registrationToken: string | string[],
    payload: admin.messaging.MessagingPayload,
    options?: admin.messaging.MessagingOptions,
  ): Promise<admin.messaging.MessagingDevicesResponse> {
    return this.messaging.sendToDevice(registrationToken, payload, options);
  }
  /**
   * @deprecated — Use Messaging.send instead.
   */
  sendToDeviceGroup(
    notificationKey: string,
    payload: admin.messaging.MessagingPayload,
    options?: admin.messaging.MessagingOptions,
  ): Promise<admin.messaging.MessagingDeviceGroupResponse> {
    return this.messaging.sendToDeviceGroup(notificationKey, payload, options);
  }
  /**
   * @deprecated — Use Messaging.send instead.
   */
  sendToTopic(
    topic: string,
    payload: admin.messaging.MessagingPayload,
    options?: admin.messaging.MessagingOptions,
  ): Promise<admin.messaging.MessagingTopicResponse> {
    return this.messaging.sendToTopic(topic, payload, options);
  }
  /**
   * @deprecated — Use Messaging.send instead.
   */
  sendToCondition(
    condition: string,
    payload: admin.messaging.MessagingPayload,
    options?: admin.messaging.MessagingOptions,
  ): Promise<admin.messaging.MessagingConditionResponse> {
    return this.messaging.sendToCondition(condition, payload, options);
  }
  subscribeToTopic(
    registrationTokens: string | string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    return this.messaging.subscribeToTopic(registrationTokens, topic);
  }
  unsubscribeFromTopic(
    registrationTokens: string | string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    return this.messaging.unsubscribeFromTopic(registrationTokens, topic);
  }
}
