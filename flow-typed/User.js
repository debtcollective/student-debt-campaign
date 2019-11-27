declare type UserCampaign = {
  id: number,
  user_id: number,
  campaign_id: number,
  data: { [string]: string }
}

declare type User = {
  id: number,
  email: string,
  username: string,
  name: string,
  avatar_url: string,
  external_id: number,
  campaigns: Array<UserCampaign>
}
