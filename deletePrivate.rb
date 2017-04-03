Dir.new("pages").each do
    |filename|
    if filename == "." || filename == ".." then next end
    File.open("pages/" + filename) do
        |handle|
        $str = handle.read
    end
    while pos = $str.index("plurk private") do
		$plurk_file = $str.slice(pos + 23, 6) + ".html"
        begin
            File.delete "plurks/" + $plurk_file
			puts $plurk_file + " deleted."
        rescue
            puts "File " + $plurk_file + " doesn't exist."
        end
        $str[Range.new(pos - 12, $str.index("private plurk") + 30)] = ""
    end
    File.open("pages/" + filename, "w") do
        |handle|
        handle.write $str
    end
end