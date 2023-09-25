import Aside from "./Aside";
import Editor from "./Editor";

function Cover() {
  return (
    <div className="relative mx-auto mb-16 max-w-6xl md:mb-32">
      <div className="rounded-xl border border-slate-200 bg-white shadow dark:bg-black md:flex">
        <aside className="border-slate-200 p-5 md:w-[385px] md:border-r">
          <Aside />
        </aside>
        <div className="mt-5 flex-1 border-t border-t-slate-100 px-4 py-8 md:mt-0 md:min-h-[560px] md:border-0 md:py-8">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default Cover;
