import {
  AirbyteLogger,
  AirbyteStreamBase,
  StreamKey,
  SyncMode,
} from 'faros-airbyte-cdk';
import {Dictionary} from 'ts-essentials';

import {BambooHR, BambooHRConfig} from '../bamboohr';
import {User} from '../models';

export class Users extends AirbyteStreamBase {
  constructor(
    private readonly config: BambooHRConfig,
    protected readonly logger: AirbyteLogger
  ) {
    super(logger);
  }

  getJsonSchema(): Dictionary<any, string> {
    return require('../../resources/schemas/users.json');
  }
  get primaryKey(): StreamKey {
    return 'id';
  }

  async *readRecords(
    syncMode: SyncMode,
    cursorField?: string[],
    streamSlice?: Dictionary<any>
  ): AsyncGenerator<User> {
    const bambooHR = await BambooHR.instance(this.config, this.logger);
    yield* bambooHR.getUsers();
  }
}
