import { useActive } from '@/store/activeStore';

export const Active = () => {
  const active = useActive((s) => s.active);
  const close = useActive((s) => s.close);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={close}>
      <div className="relative max-w-5xl w-full">
        <img
          src={active.url}
          alt={active.title}
          className="w-full h-auto rounded-xl shadow-lg"
        />
        {/* <div className="mt-2 text-sm text-neutral-100 text-center">
                {active.title}
              </div> */}
      </div>
    </div>
  );
};
