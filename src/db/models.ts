
export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum BridgePolicy {
  ALL = 'ALL',
  APPROVED = 'APPROVED',
  PERSONAL = 'PERSONAL',
}

export interface Forio {
  uuid: string;
  user_uuid: string;
  title: string;
  public: boolean;
  bridge_policy: BridgePolicy;
  content_type: ContentType;
  created: string;
}

export interface Content {
  uuid: string;
  content: string;
}

export interface Bridge {
  uuid: string;
  description: string;
  user_uuid: string;
  origin_uuid: string | null;
  destination_uuid: string | null;
  remote_host: string;
  remote_uuid: string | null;
  public: boolean;
  created: string;
}

export interface Channel {
  uuid: string;
  title: string;
  description: string;
}

export interface ForioGraph {
  uuid: string;
  graph_uuid: string;
  forio_uuid: string;
}

export interface User {
  uuid: string;
  full_name: string;
  pref_name: string;
  email: string;
  password: string;
  active: boolean;
  verified: boolean;
  created: string;
}
