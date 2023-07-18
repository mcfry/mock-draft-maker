# fix for sourcemaps: https://github.com/rails/jsbundling-rails/issues/40
class SourcemapRedirectMiddleware
    def initialize(app)
      @app = app
    end
  
    def call(env)
      if env['PATH_INFO'].match?(/.*\.(js|css)-.*\.map/)
        asset_name = env['PATH_INFO'].split('-')[0..-2].join('-')
        new_path = ActionController::Base.helpers.asset_path("#{asset_name}.map")
  
        # Preventing redirection loop
        if env['PATH_INFO'] != new_path
          return [301, { 'Location' => new_path }, []]
        end
      end
  
      @app.call(env)
    end
  end