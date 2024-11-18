export default function FullPageContent() {
    return (
        <div className="min-h-screen w-full p-16 bg-black text-white flex flex-col justify-between">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto w-full space-y-16">
                {/* Vision Section */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-semibold text-blue-400">
                        Notre Vision
                    </h2>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-3xl">
                        Nous développons des technologies de pointe pour cartographier et comprendre 
                        les connexions neuronales du cerveau humain. Notre plateforme interactive 
                        permet aux chercheurs et aux professionnels de la santé d'explorer 
                        les circuits synaptiques en temps réel.
                    </p>
                </div>

                {/* Features Grid */}
                <div className=" grid grid-cols-2 gap-8 mt-12">
                    <div className="border border-blue-900/30 rounded-lg p-8 backdrop-blur-sm bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                            Innovation IA
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Algorithmes avancés de cartographie neuronale assistée par intelligence artificielle
                        </p>
                    </div>
                    <div className="border border-blue-900/30 rounded-lg p-8 backdrop-blur-sm bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                            Visualisation 3D
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Interface interactive pour explorer les connexions synaptiques en trois dimensions
                        </p>
                    </div>
                    <div className="border border-blue-900/30 rounded-lg p-8 backdrop-blur-sm bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                            Analyse Temps Réel
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Traitement instantané des données neuronales pour une visualisation dynamique
                        </p>
                    </div>
                    <div className="border border-blue-900/30 rounded-lg p-8 backdrop-blur-sm bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                            Collaboration Cloud
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Plateforme collaborative permettant le partage et l'analyse des données en équipe
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-24 border-t border-gray-800 pt-12">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="text-blue-400 font-semibold mb-4">Solutions</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Cartographie Neuronale</li>
                                <li>Analyse de Données</li>
                                <li>Visualisation 3D</li>
                                <li>Cloud Computing</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-semibold mb-4">Ressources</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Documentation</li>
                                <li>API</li>
                                <li>Support</li>
                                <li>Formation</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-semibold mb-4">Entreprise</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>À propos</li>
                                <li>Carrières</li>
                                <li>Blog</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-blue-400 font-semibold mb-4">Légal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Confidentialité</li>
                                <li>Conditions</li>
                                <li>Licences</li>
                                <li>Sécurité</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 pb-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            © 2024 NeuroTech Solutions. Tous droits réservés.
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors">
                                En savoir plus
                            </button>
                            <button className="px-6 py-2 border border-blue-600 rounded-full text-sm font-medium hover:bg-blue-600/10 transition-colors">
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
} 