import Jobs, { removeJob } from "@/models/Jobs";
import { calcLength } from "framer-motion";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { username, job_id, model_id } = req.body;

	const job = Jobs.find((item) => item.job_id === job_id);
	console.log(Jobs);

	if (!job) {
		res.status(404).json({ message: "Job not found", job_id: job_id });
		return;
	}

	if (job.username === username && job.model_id == model_id) {
		if (job.status == "pending") {
			res.status(200).json({
				message: "Job is still running",
				isCompleted: false,
				job: null,
			});
			return;
		} else {
			res.status(200).json({
				message: "Job completed successfully",
				job: job,
				isCompleted: true,
			});

			removeJob(job.job_id);

			console.log(Jobs);
			return;
		}
	}
}
