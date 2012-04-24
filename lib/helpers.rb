
# stolen from http://github.com/cschneid/irclogger/blob/master/lib/partials.rb
#   and made a lot more robust by me
# this implementation uses erb by default. if you want to use any other template mechanism
#   then replace `erb` on line 13 and line 17 with `haml` or whatever 
module Sinatra
  module Helpers

    def partial(template, *args)
      template_array = template.to_s.split('/')
      template = template_array[0..-2].join('/') + "/_#{template_array[-1]}"
      options = args.last.is_a?(Hash) ? args.pop : {}
      options.merge!(:layout => false)
      locals = options[:locals] || {}
      if collection = options.delete(:collection) then
        collection.inject([]) do |buffer, member|
          buffer << haml(:"#{template}", options.merge(:layout =>
          false, :locals => {template_array[-1].to_sym => member}.merge(locals)))
        end.join("\n")
      else
        haml(:"#{template}", options)
      end
    end

    def aws_key
      "ASIAIUDZZRXXN54ZS45A"
    end 

    def s3_link(path)
      # print "Linking to #{path} in S3"
      "https://s3.amazonaws.com/seans-site-content#{path}?AWSAccessKeyId=#{aws_key}"
    end

    def content(name, default="")
      print "attempting to fetch content: #{name}"
      begin
        contents = RestClient.get s3_link "#{name}.md.txt"
        doc = Maruku.new(contents)
        doc.to_html
      rescue
        default
      end
    end

    def each_content_item(type, &block)
      list_link = "public/#{type}.list"
      # print "fetching #{list_link}\n"
      # arr = (RestClient.get list_link).split
      arr = File.open(list_link).read.split
      arr.each do |item| 
        name, sep, ext = item.rpartition(".") 
        block.call(name, ext)
      end
      nil
    end

    def content_cover(name)
      list_link = "public/#{name}.list"
      arr = File.open(list_link).read.split[0]
    end
  end
  

  helpers Helpers
end
