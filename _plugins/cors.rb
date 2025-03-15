class CORSMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)

    # Apply CORS header only to manifest.json
    if env["PATH_INFO"] == "/manifest.json"
      headers['Access-Control-Allow-Origin'] = '*'
    end

    [status, headers, body]
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  site.config['webrick'] ||= {}
  site.config['webrick'][:RequestCallback] = ->(req, res) do
    res.header['Access-Control-Allow-Origin'] = '*' if req.path == "/manifest.json"
  end
end
