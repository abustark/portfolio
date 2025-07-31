{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  packages = [
    pkgs.go
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.nodejs_20
    pkgs.nodePackages.nodemon
  ];

  # Enable the Nix shell to be used as a login shell. This is not
  # recommended for security reasons.
  # use a login shell. use this option only if you know what you're doing
  # allowUnfree = true;

  # programs.bash.interactiveShellInit = ''
  #   # export PS1="w> "
  # '';

  # programs.zsh.interactiveShellInit = ''
  #   # export PS1="w> "
  # '';

  # shellHook = ''
  #   # echo "Hello from your nix dev shell!"
  # '';
}
