import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
// import SubmissionReviewModal from '../../components/admin/SubmissionReviewModal';
// import { fetchAllSubmissions } from '../../api/submissions';
import toast from 'react-hot-toast';
import SubmissionDetails from '../../components/admin/SubmissionDetails';
// import { reviewSubmission } from '../../api/submissions';
import { fetchAllSubmissions, reviewSubmission } from '../../api/submissions';

const REVIEW_STATUS_CLASS = {
  Pending:  'status-badge-Submitted',
  Approved: 'status-badge-Approved',
  Rejected: 'status-badge-Rejected',
};

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  // const [reviewTarget, setReviewTarget] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const loadSubmissions = async () => {
    try {
      const { data } = await fetchAllSubmissions();
      setSubmissions(data);
    } 
    catch {
    toast.error('Failed to load submissions');
  }
    
    // catch {
    //   alert('Failed to load submissions');
    // }
  };


//  const handleReview = async (status) => {
//   try {
//     await reviewSubmission(reviewTarget._id, status);

//     toast.success('Submission reviewed successfully');

//     loadSubmissions();

//   } catch (err) {
//     toast.error(err.response?.data?.message || 'Review failed');
//   }
// };
// const handleReview = async (status) => {
//   try {
//     await reviewSubmission(selectedSubmission._id, status);

//     toast.success("Submission reviewed successfully");

//     loadSubmissions();

//   } catch (err) {
//     toast.error(err.response?.data?.message || "Review failed");
//   }
// };
// const handleReview = async (status) => {
//   try {
//     await reviewSubmission(selectedSubmission._id, status);

//     toast.success("Submission reviewed successfully");

//     await loadSubmissions();

//     // Clear the selected card
//     setSelectedSubmission(null);

//   } catch (err) {
//     toast.error(err.response?.data?.message || "Review failed");
//   }
// };

const handleReview = async (status) => {
  try {
    await reviewSubmission(selectedSubmission._id, status);

    toast.success("Submission reviewed successfully");

    await loadSubmissions();

    setSelectedSubmission(null);

  } catch (err) {
    toast.error(err.response?.data?.message || "Review failed");
  }
};
  // eslint-disable-next-line
  useEffect(() => { loadSubmissions(); }, []);
  const pending  = submissions.filter((s) => s.reviewStatus === 'Pending').length;
  const approved = submissions.filter((s) => s.reviewStatus === 'Approved').length;
  const rejected = submissions.filter((s) => s.reviewStatus === 'Rejected').length;

  const thCls = 'text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.7px] text-text-faint border-b border-border whitespace-nowrap';
  const tdCls = 'px-5 py-4 border-b border-border align-middle';

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <Sidebar />

      <main className="ml-60 flex-1 px-10 py-9">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold tracking-tight text-text-primary">Submissions</h1>
          <p className="mt-1 text-sm text-text-muted">Review talent submissions and approve or reject them.</p>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: 'Total',    value: submissions.length, color: 'text-text-primary' },
            { label: 'Pending',  value: pending,            color: 'text-info'         },
            { label: 'Approved', value: approved,           color: 'text-success'      },
            { label: 'Rejected', value: rejected,           color: 'text-danger'       },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-bg-card border border-border rounded-xl px-6 py-5 flex flex-col gap-2 hover:border-border-light transition-colors">
              <span className="text-[12px] font-medium text-text-muted uppercase tracking-[0.6px]">{label}</span>
              <span className={`text-[32px] font-bold tracking-tight ${color}`}>{value}</span>
            </div>
          ))}
        </div> */}
{/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
  {[
    { label: 'Total', value: submissions.length, color: 'text-text-primary' },
    { label: 'Pending', value: pending, color: 'text-info' },
    { label: 'Approved', value: approved, color: 'text-success' },
    { label: 'Rejected', value: rejected, color: 'text-danger' },
  ].map(({ label, value, color }) => (
    <div
      key={label}
      className="bg-bg-card border border-border rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-6 py-6"
    >
      <p className="text-[12px] uppercase tracking-wider text-text-muted mb-3">
        {label}
      </p>

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  ))}
</div>
        {/* Table */}
        {/* <div className="bg-bg-card border border-border rounded-xl overflow-hidden"> */}
       <div className="grid grid-cols-3 gap-6">

  {/* Left Panel */}
  <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">

    <div className="px-5 py-4 border-b border-border">
      <h2 className="text-lg font-semibold text-text-primary">
        All Submissions
      </h2>
    </div>
<div className="max-h-[650px] overflow-y-auto">

  {submissions.filter(sub => sub.reviewStatus === "Pending").length === 0 ? (

    <div className="p-8 text-center text-text-faint">
      🎉 All submissions have been reviewed.
    </div>

  ) : (

    submissions
      .filter((sub) => sub.reviewStatus === "Pending")
      .map((sub) => (

        <div
          key={sub._id}
          onClick={() => setSelectedSubmission(sub)}
          className={`cursor-pointer border-b border-border p-4 hover:bg-bg-hover transition ${
            selectedSubmission?._id === sub._id
              ? "bg-primary/10 border-l-4 border-primary"
              : ""
          }`}
        >

          <h3 className="font-semibold text-text-primary">
            {sub.taskId?.title || "Untitled Task"}
          </h3>

          <p className="text-sm text-text-muted mt-1">
            {sub.talentId?.name || "Unknown Talent"}
          </p>

          <span
            className={`inline-block mt-3 px-2 py-1 rounded-full text-xs ${
              REVIEW_STATUS_CLASS[sub.reviewStatus]
            }`}
          >
            {sub.reviewStatus}
          </span>

        </div>

      ))

  )}

</div>

  </div>

  {/* Right Panel */}

  <div className="col-span-2">

    {/* <SubmissionDetails
      submission={reviewTarget}
      onReview={handleReview}
    /> */}
    <SubmissionDetails
  submission={selectedSubmission}
  onReview={handleReview}
/>

  </div>

</div>
      </main>

      {/* {reviewTarget && (
        <SubmissionReviewModal
          submission={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onReviewed={() => { setReviewTarget(null); loadSubmissions(); }}
        />
      )} */}
    </div>
  );
};

export default SubmissionsPage;
