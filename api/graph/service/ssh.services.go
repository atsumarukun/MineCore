package service

import (
	"api/conf"
	"fmt"
	"io/ioutil"
	"golang.org/x/crypto/ssh"
)

func (_ SshService) RunCommand(command string) (string, error) {
	buf, err := ioutil.ReadFile("/go/src/api/PrivateKey"); if err != nil {
		return "", err
	}
	key, err := ssh.ParsePrivateKey(buf); if err != nil {
		return "", err
	}

	config := &ssh.ClientConfig{
        User: conf.HostUser,
        Auth: []ssh.AuthMethod{
			ssh.PublicKeys(key),
        },
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
    }

	client, err := ssh.Dial("tcp", fmt.Sprintf("%s:%s", conf.HostName, conf.HostPort), config)
	if err != nil {
		return "", err
	}
	session, err := client.NewSession()
	if err != nil {
		return "", err
	}
	defer session.Close()

	res, err := session.Output(command); if err != nil {
		return "", err
	}
	return string(res), nil
}

type SshService struct{}