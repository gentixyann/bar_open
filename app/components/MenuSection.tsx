export default function MenuSection() {
  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Menu
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 p-5 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300">
            <div className="space-y-8 text-center">
              {/* 注釈 */}
              <div className="text-center pb-8 border-b border-gray-700">
                <div className="text-base text-gray-200 leading-relaxed">
                  <p className="mb-3">
                    みんなが飲む王道は大体あります。
                  </p>
                  <p>ただし</p>
                  <p>
                    食事、お酒、ノンアル、アルアル、おつまみ、人々、得意不得意、これら含めオープンではメニューも日々変化しています。その日だからこその出会いと発見をお楽しみください。
                  </p>
                </div>
              </div>

              {/* チャージ */}
              <div className="pb-8 border-b border-gray-700">
                <h4 className="text-2xl font-bold text-white mb-4">チャージ</h4>
                <p className="text-3xl text-accent font-bold">¥500</p>
              </div>

              {/* ドリンク */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">ドリンク</h4>
                <div className="space-y-4">
                  <div className="py-4">
                    <p className="text-xl text-gray-300">単品メニュー</p>
                  </div>
                  <div className="py-4">
                    <p className="text-xl text-gray-300 mb-2">飲み放着</p>
                    <p className="text-3xl text-accent font-bold">¥3,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
