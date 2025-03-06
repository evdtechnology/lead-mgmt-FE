// enums/LeadStatus.ts
export enum LeadStatus {
    NEW = "New",
    ENGAGED = "Engaged",
    PROPOSAL_SENT = "Proposal Sent",
    CLOSED_WON = "Closed-Won",
    CLOSED_LOST = "Closed-Lost",
  }
  
  // Exporting an array for easier mapping
  export const LEAD_STATUSES = Object.values(LeadStatus);
  