export interface JobType {
	job_id: string;
	username: string;
	prompt: string;
	model_id: string;
	status: "pending" | "complete";
	res: any | null;
	url: string | "";
	err: string | null;
}

let Jobs: JobType[] = [];

export const removeJob = (job_id: string) => {
	Jobs = Jobs.filter((job) => job.job_id !== job_id);
	console.log(Jobs);
};

export default Jobs;
