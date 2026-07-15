import { claimTask } from '../../api/talent';
import toast from 'react-hot-toast';

const STATUS_CLASS = {
  Open:      'status-badge-Open',
  Claimed:   'status-badge-Claimed',
  Submitted: 'status-badge-Submitted',
  Approved:  'status-badge-Approved',
  Rejected:  'status-badge-Rejected',
};

const TaskCard = ({ task, showClaimButton = false, onClaimed }) => {

  const handleClaim = async () => {
    try {
      await claimTask(task._id);
      if (onClaimed) onClaimed();
      toast.success('Task claimed successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to claim task');
    }
  };

  // return (
  //   <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-border-light hover:-translate-y-0.5 transition-all cursor-default">

  //     {/* Header: title + status */}
  //     <div className="flex items-start justify-between gap-2.5">
  //       <p className="text-[15px] font-semibold text-text-primary leading-snug">{task.title || 'Untitled Task'}</p>
  //       {task.status && (
  //         <span className={`shrink-0 inline-block px-2.5 py-[3px] rounded-full text-[11px] font-semibold tracking-[0.3px] ${STATUS_CLASS[task.status] || ''}`}>
  //           {task.status}
  //         </span>
  //       )}
  //     </div>

      
  //     {task.description && (
  //       <p className="text-[13px] text-text-muted leading-relaxed">{task.description}</p>
  //     )}

  //     {/* Meta row */}
  //     <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
        
  //       <span className="text-[12px] text-text-faint">
  //         {task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}
  //       </span>
  //       {task.createdBy?.name && (
  //         <span className="text-[12px] text-text-faint">By {task.createdBy.name}</span>
  //       )}
  //     </div>

  //     {showClaimButton && (
  //       <button onClick={handleClaim}
  //         className="w-full py-2.5 rounded-lg border-none text-[13px] font-semibold text-white cursor-pointer btn-gradient font-sans mt-1">
  //         Claim Task →
  //       </button>
  //     )}
  //   </div>
  // );
  return (
  <div className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-2xl">

    {/* Reward Badge */}
    <div className="absolute top-4 right-4">
      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-400">
        💰 $500
      </span>
    </div>

    {/* Status */}
    {task.status && (
      <span
        className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CLASS[task.status]}`}
      >
        {task.status}
      </span>
    )}

    {/* Title */}
    <h2 className="text-lg font-bold text-text-primary mb-2">
      {task.title || "Untitled Task"}
    </h2>

    {/* Description */}
    <p className="text-sm text-text-muted mb-5 line-clamp-3">
      {task.description || "No description available"}
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between text-xs text-text-faint mb-5">
      <span>
        📅 {task.dueDate || "No due date"}
      </span>

      <span>
        👤 {task.createdBy?.name || "Admin"}
      </span>
    </div>

    {showClaimButton && (
      <button
        onClick={handleClaim}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]"
      >
        🚀 Claim Task
      </button>
    )}
  </div>
);
};

export default TaskCard;
