package service

import (
	"api/graph/model"
	"strings"
)

func (_ ServiceService) GetServices() ([]*model.Service, error) {
	var ss []*model.Service

	serv := SshService{}
	res, err := serv.RunCommand("docker-compose ls -a"); if err != nil {
		return nil, err
	}

	services := strings.Split(res, "\n")
	for _, s := range services[1:len(services) - 1] {
		desc := strings.Split(strings.Replace(strings.Join(strings.Fields(s), " "), ", ", ",", 1), " ")
		var status model.Status
		if len(strings.Split(desc[1], ",")) == 1 {
			if strings.Contains(desc[1], "running") {
				status = model.StatusRunning
			} else {
				status = model.StatusExited
			}
		} else {
			status = model.StatusPartial
		}
		ss = append(ss, &model.Service{desc[0], desc[2], status})
	}
	return ss, nil
}

type ServiceService struct{}
