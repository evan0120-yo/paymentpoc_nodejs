import type { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = process.env.APP_KEYS || `${appInfo.name}_local_dev_key`;
  config.middleware = [];

  config.customLoader = {
    repository: {
      directory: 'app/repository',
      inject: 'ctx',
      caseStyle: 'lower',
    }
  }

  return config;
};

