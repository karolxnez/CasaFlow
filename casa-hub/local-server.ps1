$Port = 4173
$Root = Join-Path $PSScriptRoot "preview"
$Server = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
$Server.Start()
Write-Host "Casa Hub preview: http://127.0.0.1:$Port"

try {
  while ($true) {
    $Client = $Server.AcceptTcpClient()
    try {
      $Stream = $Client.GetStream()
      $Reader = [System.IO.StreamReader]::new($Stream)
      $RequestLine = $Reader.ReadLine()

      if ([string]::IsNullOrWhiteSpace($RequestLine)) {
        $Client.Close()
        continue
      }

      $Parts = $RequestLine.Split(" ")
      $RequestPath = if ($Parts.Length -gt 1) { $Parts[1] } else { "/" }
      if ($RequestPath -eq "/") {
        $RequestPath = "/index.html"
      }

      while (-not [string]::IsNullOrWhiteSpace($Reader.ReadLine())) {}

      $RelativePath = $RequestPath.Split("?")[0].TrimStart("/") -replace "/", [System.IO.Path]::DirectorySeparatorChar
      $FilePath = [System.IO.Path]::GetFullPath((Join-Path $Root $RelativePath))
      $RootPath = [System.IO.Path]::GetFullPath($Root)

      if ((-not $FilePath.StartsWith($RootPath)) -or (-not (Test-Path -LiteralPath $FilePath -PathType Leaf))) {
        $Body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
        $Header = [System.Text.Encoding]::ASCII.GetBytes("HTTP/1.1 404 Not Found`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n")
        $Stream.Write($Header, 0, $Header.Length)
        $Stream.Write($Body, 0, $Body.Length)
        continue
      }

      $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
      $HeaderText = "HTTP/1.1 200 OK`r`nContent-Type: text/html; charset=utf-8`r`nContent-Length: $($Bytes.Length)`r`nConnection: close`r`n`r`n"
      $Header = [System.Text.Encoding]::ASCII.GetBytes($HeaderText)
      $Stream.Write($Header, 0, $Header.Length)
      $Stream.Write($Bytes, 0, $Bytes.Length)
    }
    finally {
      $Client.Close()
    }
  }
}
finally {
  $Server.Stop()
}
