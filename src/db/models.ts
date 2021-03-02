
export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum PublicState {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface Forio {
  uuid: string;
  owner_uuid: string;
  title: string;
  content_type: ContentType;
  public: PublicState,
}

export interface ForioContent {
  uuid: string;
  content: string;
}

export interface ForioLink {
  uuid: string;
  start: string;
  end: string;
}

export interface Squad {
  uuid: string;
  title: string;
  description: string;
}

export interface ForioInForioGraph {
  uuid: string;
  graph_uuid: string;
  forio_uuid: string;
}

export interface User {
  uuid: string;
  full_name: string;
  preferred_name: string;
  email: string;
  password?: string;
}
