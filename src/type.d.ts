type Res<T> = {
  success: boolean;
  message: string;
  result: T;
  paginate?: {
    totalPage: number;
    total: number;
    page: number;
  };
};

type User = {
  username: string;
  role: string;
};

type ClientOpts = {
  ssl: boolean;
  port: number;
  hostname: string;
  username: string;
  password: string;
  clientId: string;
  keepalive: number;
  will?: import('mqtt').IClientOptions['will'];
};

type Topic = {
  qos: number;
  topic: string;
  retain: boolean;
  message: string;
};

type Channel = Pick<Topic, 'qos' | 'topic'>;

type Message = {
  epoch: number;
} & Pick<Topic, 'message' | 'topic'>;

type Instance = {
  name: string;
  clientOpts: ClientOpts;
};
