import type { StoreShape } from './types'

// No dummy data. All real data now comes from the backend/MongoDB (admin,
// mentor and investor views fetch from the API). This local store is only a
// last-resort fallback when the backend is unreachable, so it starts empty —
// nothing fake is ever shown to the client.
export function SEED(): StoreShape {
  return {
    users: [],
    founderApplications: [],
    mentorProfiles: [],
    investorProfiles: [],
    expertProfiles: [],
    bookOrders: [],
    pledges: [],
    matches: [],
  }
}
