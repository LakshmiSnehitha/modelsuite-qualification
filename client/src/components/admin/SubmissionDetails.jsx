const REVIEW_STATUS_CLASS = {
  Pending: "status-badge-Submitted",
  Approved: "status-badge-Approved",
  Rejected: "status-badge-Rejected",
};

const SubmissionDetails = ({ submission, onReview }) => {
  if (!submission) {
    return (
      <div className="flex items-center justify-center h-full text-text-faint">
        Select a submission to review
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-6 h-full">

      <h2 className="text-xl font-bold mb-6">
        Submission Details
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-xs text-text-faint uppercase">Task</p>
          <h3 className="text-lg font-semibold">
            {submission.taskId?.title || "No Task"}
          </h3>
        </div>

        <div>
          <p className="text-xs text-text-faint uppercase">Talent</p>
          <p>{submission.talentId?.name || "Unknown"}</p>
        </div>

        <div>
          <p className="text-xs text-text-faint uppercase">Email</p>
          <p>{submission.talentId?.email || "--"}</p>
        </div>

        <div>
          <p className="text-xs text-text-faint uppercase">Notes</p>
          <p>{submission.notes || "No Notes"}</p>
        </div>

        <div>
          <p className="text-xs text-text-faint uppercase">File</p>

          {submission.fileUrl ? (
            <a
              href={submission.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              View File
            </a>
          ) : (
            <p>No File</p>
          )}
        </div>

        <div>
          <p className="text-xs text-text-faint uppercase">Status</p>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              REVIEW_STATUS_CLASS[submission.reviewStatus]
            }`}
          >
            {submission.reviewStatus}
          </span>
        </div>

        <div className="flex gap-3 pt-6">

          <button
            onClick={() => onReview("Approved")}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            Approve
          </button>

          <button
            onClick={() => onReview("Rejected")}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  );
};

export default SubmissionDetails;