"use client";

import { useState } from 'react';
import { createComment } from '@/app/actions';

export function CommentForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    try {
      const result = await createComment(formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Komentar berhasil ditambahkan!' });
        const form = document.getElementById('comment-form') as HTMLFormElement;
        form?.reset();
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Gagal menambahkan komentar.' });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-comment-dots text-blue-500"></i> Tinggalkan Pesan
      </h3>
      
      <form id="comment-form" action={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1.5">
            Pesan / Saran
          </label>
          <textarea 
            id="comment"
            name="comment" 
            placeholder="Ketik saran atau masukan Anda di sini..."
            rows={3}
            required
            className="w-full px-4 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/50 dark:text-zinc-200 resize-none transition-all"
          />
        </div>
        
        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
            <i className={`fa-solid ${message.type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'} mr-2`}></i>
            {message.text}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? (
            <><i className="fa-solid fa-circle-notch fa-spin"></i> Mengirim...</>
          ) : (
            <><i className="fa-solid fa-paper-plane text-sm"></i> Kirim Komentar</>
          )}
        </button>
      </form>
    </div>
  );
}
