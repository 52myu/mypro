if (process.env.NODE_ENV == 'development') {
	fis.config.merge({
		roadmap: {
			domain: 'http://localhost:3600'
		}
	});
} else {
	fis.config.merge({
		roadmap: {
			domain: 'http://www.{%= name %}.com'
		}
	})
}