const team = [
  {
    name: "Richard Smith",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 10+ years in mobile tech and e-commerce platforms.",
    color: "from-blue-400 to-blue-600",
    initials: "RS",
  },
  {
    name: "Samara Kane",
    role: "CTO",
    bio: "Full-stack engineer passionate about building scalable marketplace infrastructure.",
    color: "from-violet-400 to-purple-600",
    initials: "SK",
  },
  {
    name: "Elizabeth Monroe",
    role: "Head of Vendors",
    bio: "Specialist in vendor relations and marketplace growth strategies.",
    color: "from-cyan-400 to-teal-600",
    initials: "EM",
  },
  {
    name: "James Tate",
    role: "Lead Designer",
    bio: "UI/UX designer crafting seamless buying and selling experiences.",
    color: "from-pink-400 to-rose-600",
    initials: "JT",
  },
];

export default function Team() {
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            👥 Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            The People Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              MobiHub
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Passionate experts building the future of mobile commerce in your hands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Avatar area */}
              <div className={`h-40 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 20%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="w-20 h-20 rounded-full bg-white/25 backdrop-blur border-2 border-white/40 flex items-center justify-center">
                  <span className="text-white font-black text-2xl">{member.initials}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-gray-900 font-black text-lg mb-0.5">{member.name}</h3>
                <p className="text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>

                {/* Social links */}
                <div className="flex gap-2 mt-4">
                  {["in", "tw", "gh"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-blue-600 flex items-center justify-center text-gray-500 hover:text-white transition-all text-xs font-bold"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
