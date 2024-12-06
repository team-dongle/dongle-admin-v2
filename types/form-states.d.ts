/**
 *  General
 */

export interface GeneralFormState {
  formError?: string;
  ok: boolean;
  errors?: string | string[];
}

/**
 *  User
 */
export interface CreateUserFormState
  extends Exclude<GeneralFormState, "errors"> {
  errors?: {
    username?: string[];
    password?: string[];
  };
}

/**
 *  Club
 */
export interface CreateClubFormState
  extends Exclude<GeneralFormState, "errors"> {
  errors?: {
    name?: string[];
    location?: string[];
    contact?: string[];
    sns?: string[];
    thumbnail?: string[];
    detail?: string[];
    isRecruiting?: string[];
    recruitPeriod?: string[];
    applyUrl?: string[];
    logo?: string[];
    categoryId?: string[];
    ownerId?: string[];
  };
}

export interface UpdateClubFormState
  extends Exclude<GeneralFormState, "errors"> {
  errors?: {
    _id?: string[];
    name?: string[];
    location?: string[];
    contact?: string[];
    sns?: string[];
    thumbnail?: string[];
    detail?: string[];
    isRecruiting?: string[];
    recruitPeriod?: string[];
    applyUrl?: string[];
    logo?: string[];
  };
}

/**
 *  Notice
 */
export interface CreateNoticeFormState
  extends Exclude<GeneralFormState, "errors"> {
  errors?: {
    title?: string[];
    content?: string[];
    attachments?: string[];
  };
}

/**
 *  Banner
 */
export interface UploadBannerFormState
  extends Exclude<GeneralFormState, "errors"> {
  errors?: {
    name?: string[];
    description?: string[];
    imageUrl?: string[];
    href?: string[];
  };
}
