module.exports = (req, res, next) => {
    let host = req.headers.host;
    if (req.get('X-Forwarded-Proto')=='https' && !host.match(/^www\..*/i)){
        if(req.path.substr(-1) == '/' && req.path.length > 1){
            var query = req.url.slice(req.path.length);
            res.redirect(301, req.path.slice(0, -1) + query);
        } else{
            next();
        }
    } else if (host.match(/^www\..*/i) || req.get('X-Forwarded-Proto')!='https') {
        return res.redirect(301, "https://" + req.hostname.replace(/^www\./, '') + req.url);
    }
}