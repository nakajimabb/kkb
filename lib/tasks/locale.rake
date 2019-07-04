namespace :locale do
  desc "config/locales 以下の ymlファイルを javascriptファイルに変換"
  task :js do
    require 'yaml'

    translations = {}
    Dir.glob("config/locales/*.yml").each do |f|
      translations.merge!(YAML.load_file(File.absolute_path(f)))
    end

    file = File.open("app/javascript/packs/locale.js", "w")
    file.puts('const translations=' + translations.to_json + ';')
    file.puts('')
    file.puts('export default translations;')
    file.close
  end
end
