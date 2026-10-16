#!/usr/bin/env bash
# Run the site locally with Ruby 3.3, without changing your global default Ruby.
set -euo pipefail
cd "$(dirname "$0")"

RUBY33="$(brew --prefix ruby@3.3 2>/dev/null || echo /opt/homebrew/opt/ruby@3.3)"
if [ ! -x "$RUBY33/bin/ruby" ]; then
  echo "Ruby 3.3 not found. Install it first:  brew install ruby@3.3"
  exit 1
fi

export PATH="$RUBY33/bin:$PATH"
export PATH="$("$RUBY33/bin/gem" environment gemdir)/bin:$PATH"

command -v bundle >/dev/null 2>&1 || gem install bundler
bundle check >/dev/null 2>&1 || bundle install

echo "Using $(ruby -v)"
exec bundle exec jekyll serve --livereload --open-url
