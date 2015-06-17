#!/bin/bash

cmd='default'
if [ -n "$1" ]; then
	cmd='build'
else
	container=$(docker ps -a | grep {%= name %}_default | awk '{print $1}')
	if [ -n "$container" ]; then
		docker restart {%= name %}_default
		exit 0
	fi
fi

dock -r {%= name %}:$cmd