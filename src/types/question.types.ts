export interface AskQuestionInput {
  title: string;
  description: string;
  tags: string;
  yrModel: string;
  vehicleType: string;
  isPrivateEcosystem: boolean;

  hearConcern: boolean;
  seeConcern: boolean;
  smellConcern: boolean;
  feelConcern: boolean;
  notStarting: boolean;
  performanceConcern: boolean;
  dashboardWarningLights: boolean;
}