export default function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-bg-section">
      <div className="container mx-auto px-6">
        <h3 className="font-motor text-5xl tracking-widest text-accent text-center mb-12">
          Menu
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 text-center">
            {/* 注釈 */}
            <div className="text-center pb-8 border-b border-accent/20">
              <div className="text-base text-foreground leading-relaxed">
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
            <div className="pb-8 border-b border-accent/20">
              <h4 className="text-2xl font-bold text-foreground mb-4">チャージ</h4>
              <p className="text-3xl text-accent font-bold">500円</p>
            </div>

            {/* 単品メニュー */}
            <div className="pb-8 border-b border-accent/20">
              <h4 className="text-2xl font-bold text-foreground mb-6">単品メニュー</h4>
              <div className="space-y-6 text-left max-w-sm mx-auto">
                {/* ハイボール */}
                <div>
                  <h5 className="text-base font-bold text-foreground mb-2 border-b border-accent/20 pb-1">ハイボール</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-foreground">
                      <span>山崎ハイボール</span>
                      <span>700円</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Dewarsハイボール</span>
                      <span>700円</span>
                    </div>
                  </div>
                </div>
                {/* ビール */}
                <div>
                  <h5 className="text-base font-bold text-foreground mb-2 border-b border-accent/20 pb-1">ビール</h5>
                  <div className="flex justify-between text-foreground">
                    <span>サッポロクラシック</span>
                    <span>700円</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 飲み放題 */}
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-4">飲み放題</h4>
              <p className="text-3xl text-accent font-bold">3,000円</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
