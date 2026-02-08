export default function MenuSection() {
  const menuCategories = [
    {
      title: "Cocktails",
      items: [
        { name: "マティーニ", price: "¥1,500" },
        { name: "マンハッタン", price: "¥1,500" },
        { name: "オールドファッションド", price: "¥1,400" },
        { name: "モヒート", price: "¥1,300" },
        { name: "ネグローニ", price: "¥1,400" },
      ],
    },
    {
      title: "Whisky & Spirits",
      items: [
        { name: "山崎 12年", price: "¥2,500" },
        { name: "響 ジャパニーズハーモニー", price: "¥2,000" },
        { name: "マッカラン 12年", price: "¥2,200" },
        { name: "ジンビーム", price: "¥1,000" },
        { name: "グレンフィディック 12年", price: "¥1,800" },
      ],
    },
    {
      title: "Food",
      items: [
        { name: "チーズ盛り合わせ", price: "¥1,800" },
        { name: "生ハムとオリーブ", price: "¥1,500" },
        { name: "ナッツミックス", price: "¥800" },
        { name: "アヒージョ", price: "¥1,200" },
        { name: "カルパッチョ", price: "¥1,600" },
      ],
    },
    {
      title: "Soft Drinks",
      items: [
        { name: "コーヒー", price: "¥600" },
        { name: "紅茶", price: "¥600" },
        { name: "ジンジャーエール", price: "¥500" },
        { name: "オレンジジュース", price: "¥500" },
        { name: "ウーロン茶", price: "¥400" },
      ],
    },
  ];

  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Menu
        </h3>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {menuCategories.map((category) => (
            <div
              key={category.title}
              className="bg-gray-900/50 p-8 rounded-lg hover:shadow-[0_5px_15px_#ffffff20] transition-all duration-300"
            >
              <h4 className="text-2xl font-bold text-white mb-6">
                {category.title}
              </h4>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#8224e3] font-bold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
