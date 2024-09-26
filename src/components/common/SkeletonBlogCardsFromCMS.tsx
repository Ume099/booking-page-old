const SkeletonBlogCardsFromCMS = (): JSX.Element => {
  // 通知メッセージ、本文なし
  return (
    <>
      <div className="flex animate-pulse justify-center px-12">
        <div className="mt-14 max-w-4xl">
          <div className="my-8">
            <div className="grid grid-cols-3 gap-x-4">
              <div className="h-96 w-96"></div>
              <div className="px-2 py-4">
                <h1 className="text-lg font-bold"></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonBlogCardsFromCMS;
